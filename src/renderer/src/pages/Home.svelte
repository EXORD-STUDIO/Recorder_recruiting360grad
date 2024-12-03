<script lang="ts">
  //   window.electron.ipcRenderer.on('sources', async (event, sources) => {
  //     const source = sources[0]

  import Base from '../layouts/Base.svelte'

  //   })
  let size = 0
  let mediaRecorder: MediaRecorder

  async function startRecording(): Promise<void> {
    console.log('Start recording')
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log('Devices:', devices)
    })
    const audioContext = new AudioContext()

    // Add audio mic track
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioIn = audioContext.createMediaStreamSource(audioStream)

    // Add desktop audio track
    const desktopStream = await navigator.mediaDevices.getDisplayMedia({ audio: true })
    const desktopIn = audioContext.createMediaStreamSource(desktopStream)

    const dest = audioContext.createMediaStreamDestination()

    audioIn.connect(dest)
    desktopIn.connect(dest)

    handleStream(dest.stream)
  }

  function handleStream(stream: MediaStream): void {
    const ID = Math.random().toString(36).substring(7)

    mediaRecorder = new MediaRecorder(stream)
    size = 0

    window.electron.ipcRenderer.send('start-recording', ID)

    mediaRecorder.addEventListener('dataavailable', async (event) => {
      size += event.data.size
      const arrayBuffer = await event.data.arrayBuffer()
      window.electron.ipcRenderer.send('write-audio', ID, arrayBuffer)

      if (mediaRecorder.state === 'inactive') {
        window.electron.ipcRenderer.send('stop-recording', ID)
        mediaRecorder = null
      }
    })

    mediaRecorder.start(1000)
  }

  function stopRecording(): void {
    if (!mediaRecorder) return
    mediaRecorder.stop()
  }
</script>

<Base>
  <div>
    <h1>Home</h1>
    <p>Welcome to the home page.</p>
    <div class="pt-10">Recording is {mediaRecorder ? 'running' : 'not running'}</div>
    <div class="flex p-4 gap-2">
      <button class="btn btn-primary" on:click={startRecording}>Start Recording</button>
      <button class="btn btn-primary" on:click={stopRecording}>Stop Recording</button>
    </div>
    <p>Size: {size}</p>
  </div>
</Base>
