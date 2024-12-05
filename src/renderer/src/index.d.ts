import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      startRecording: (id: string) => Promise<string>
    }
  }
}
