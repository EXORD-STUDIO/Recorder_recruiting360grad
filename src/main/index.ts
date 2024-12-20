import { app, shell, BrowserWindow, ipcMain, desktopCapturer, session } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { getAutoUpdater } from './autoUpdater'

const writeStreams: { [key: string]: fs.WriteStream } = {}
let mainWindow: BrowserWindow | null

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('recorder', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('recorder')
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_, commandLine) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }

    mainWindow?.webContents.send('deeplink', commandLine.pop()?.slice(0))
  })

  app.on('open-url', (_, url) => {
    mainWindow?.webContents.send('deeplink', url)
  })
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 420,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
    desktopCapturer.getSources({ types: ['screen', 'window'] }).then((sources) => {
      console.log(sources)
      // Grant access to capture desktop and microphone audio
      callback({ enableLocalEcho: true, audio: 'loopback', video: sources[0] })
    })
  })

  ipcMain.handle('get:version', () => {
    return app.getVersion()
  })

  ipcMain.handle('read-file', async (_, uri) => {
    const blob = await fs.openAsBlob(uri)
    return await blob.arrayBuffer()
  })

  ipcMain.handle('recording:start', (_, id) => {
    console.log('start-recording')
    // Start a new write stream
    const file = join(app.getPath('appData'), 'recorder-recruiting360grad', `${Date.now()}.mp3`)
    const writeStream = fs.createWriteStream(file, { encoding: 'binary' })
    writeStreams[id] = writeStream
    return file
  })

  ipcMain.on('start-recording', (_, id) => {
    console.log('start-recording')
    // Start a new write stream
    const file = join(app.getPath('appData'), `${id}.mp3`)
    const writeStream = fs.createWriteStream(file, { encoding: 'binary' })
    writeStreams[id] = writeStream
  })

  ipcMain.on('stop-recording', (_, id) => {
    console.log('stop-recording')
    // Stop the write stream
    writeStreams[id]?.end()
  })

  ipcMain.on('write-audio', (_, id, arrayBuffer) => {
    console.log('write-audio')
    // Write to the write stream
    const buffer = Buffer.from(arrayBuffer, 'binary')
    writeStreams[id]?.write(buffer)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const result = await getAutoUpdater().checkForUpdatesAndNotify()
  console.log(result)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
