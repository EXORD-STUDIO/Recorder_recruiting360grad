import type { RecordingSettings } from './recordingSettings'

export interface CurrentRecording {
  id: string
  name: string
  mediaRecorder: MediaRecorder
  audioContext: AudioContext
  fileUrl: string
  size: number
  settings: RecordingSettings
  startTime: number
  length: number
}
