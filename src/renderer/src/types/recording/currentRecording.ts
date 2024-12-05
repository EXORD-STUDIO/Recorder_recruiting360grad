import type { RecordingSettings } from './recordingSettings'

export interface CurrentRecording {
  id: string
  mediaRecorder: MediaRecorder
  size: number
  settings: RecordingSettings
  startTime: number
  length: number
}
