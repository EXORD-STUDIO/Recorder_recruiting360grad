import { writable, type Writable } from 'svelte/store'
import type { CurrentRecording } from '../types/recording/currentRecording'
import type { RecordingSettings } from '../types/recording/recordingSettings'
import { addRecording } from '../utils/indexDb'

export const currentRecording: Writable<CurrentRecording | null> = writable(null)

export async function startRecording(settings: RecordingSettings): Promise<void> {
  console.log('Start recording')
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    console.log('Devices:', devices)
  })
  const audioContext = new AudioContext()

  // Add audio mic track
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true
  })
  const audioIn = audioContext.createMediaStreamSource(audioStream)

  // Add desktop audio track
  const desktopStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true
  })
  const desktopIn = audioContext.createMediaStreamSource(desktopStream)

  const dest = audioContext.createMediaStreamDestination()

  audioIn.connect(dest)
  desktopIn.connect(dest)

  const id = Math.random().toString(36).substring(7)
  const mediaRecorder = new MediaRecorder(dest.stream)

  const fileUrl = await window.api.startRecording(id)

  mediaRecorder.addEventListener('dataavailable', async (event) => {
    if (!currentRecording) return
    currentRecording.update((currentRecording) => {
      currentRecording.size += event.data.size
      currentRecording.length = Date.now() - currentRecording.startTime
      return currentRecording
    })
    const arrayBuffer = await event.data.arrayBuffer()
    window.electron.ipcRenderer.send('write-audio', id, arrayBuffer)

    if (mediaRecorder.state === 'inactive') {
      window.electron.ipcRenderer.send('stop-recording', id)
      currentRecording.set(null)
    }
  })

  mediaRecorder.start(1000)

  currentRecording.set({
    id: id,
    name: settings.name,
    fileUrl: fileUrl,
    mediaRecorder: mediaRecorder,
    audioContext: audioContext,
    size: 0,
    settings,
    startTime: Date.now(),
    length: 0
  })
}

export function stopRecording(currentRecording: CurrentRecording): void {
  if (!currentRecording.mediaRecorder) return
  currentRecording.mediaRecorder.stop()
  addRecording({
    name: currentRecording.name,
    id: currentRecording.id,
    size: currentRecording.size,
    length: currentRecording.length,
    contact: currentRecording.settings.contact,
    createdAt: Date.now(),
    fileURI: currentRecording.fileUrl,
    uploaded: false
  })
}
