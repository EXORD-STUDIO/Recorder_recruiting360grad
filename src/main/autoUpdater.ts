import electronUpdater, { type AppUpdater } from 'electron-updater'

const REPO_USER = 'EXORD-STUDIO'
const REPO_NAME = 'Recorder_recruiting360grad'

export function getAutoUpdater(): AppUpdater {
  // Using destructuring to access autoUpdater due to the CommonJS module of 'electron-updater'.
  // It is a workaround for ESM compatibility issues, see https://github.com/electron-userland/electron-builder/issues/7976.
  const { autoUpdater } = electronUpdater
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: REPO_USER,
    repo: REPO_NAME
  })
  return autoUpdater
}
