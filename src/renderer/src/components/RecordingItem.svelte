<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { Recording } from '../types/recording/recording'
  import { getContactName, lengthToString, timeStampToString } from '../utils/formatters'
  import { user } from '../stores/user.store'
  import { dialogs } from './dialogs/dialogs.store'
  import { pb } from '../auth/pocketbase'
  import { Collections } from '../types/pocketbase-types'
  import { updateRecording } from '../utils/indexDb'

  export let recording: Recording

  let audio: HTMLAudioElement
  let playing = false
  let progress = 0

  function togglePlay() {
    if (audio && audio.paused) {
      audio.play()
    } else if (audio) {
      audio.pause()
    }
  }

  async function uploadRecording() {
    const formData = new FormData()
    const recordBinary = await window.api.readFile(recording.fileURI.replace('file:///', ''))
    const recordingFile = new File([recordBinary], recording.name + '.mp3', {
      type: 'audio/mpeg',
      lastModified: recording.createdAt
    })
    formData.append('files', recordingFile)
    formData.append('title', recording.name)
    formData.append('contact', recording.contact.id)
    formData.append('creator', $user.id)
    formData.append('team', recording.contact.team)
    if (recording.name === 'DSGVO') {
      formData.append('type', 'Mündliche Einwilligung nach DSGVO')
    }
    const comment = {
      appVersion: window.electron.process.versions.appVersion,
      duration: recording.length,
      size: recording.size
    }
    formData.append('comment', JSON.stringify(comment))
    formData.append('created', new Date(recording.createdAt).toISOString())

    try {
      await pb.collection(Collections.Documents).create(formData)

      recording.uploaded = true
      updateRecording(recording)
    } catch (error) {
      console.error(error)
    }
  }

  function uploadDialog() {
    dialogs.add({
      title: 'Upload',
      message: recording.uploaded
        ? 'Die Aufnahme wurde bereits hochgeladen. Möchten Sie sie trotzdem nochmal hochladen?'
        : 'Möchten Sie die Aufnahme hochladen?',
      cancelText: 'Abbrechen',
      confirmText: 'Hochladen',
      onConfirm: async () => {
        await uploadRecording()
      }
    })
  }
</script>

<div class="w-full rounded-md px-2 py-2 bg-brand-50 relative">
  <div class="flex gap-2 justify-between items-center">
    <div>
      <h1 class="font-semibold">
        {recording.contact ? getContactName(recording.contact) : 'Unbekannt'}
      </h1>
      <p class="text-sm text-gray-500">
        {recording.name}.mp3 | {timeStampToString(recording.createdAt)} | {lengthToString(
          recording.length
        )} min
      </p>
    </div>
    <div>
      <button on:click={uploadDialog}>
        {#if recording.uploaded}
          <div class="text-green-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
        {/if}
      </button>

      <button on:click={togglePlay}>
        {#if audio && !playing}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        {/if}
      </button>
    </div>
  </div>
  <audio
    bind:this={audio}
    src={recording.fileURI.replace('file:///', '')}
    on:timeupdate={() => (progress = audio.currentTime / (recording.length / 1000))}
    on:pause={() => (playing = false)}
    on:play={() => {
      playing = true
    }}
    on:ended={() => {
      playing = false
      progress = 0
    }}
  ></audio>
  {#if progress !== 0}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="cursor-pointer py-2"
      on:click={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const width = rect.width
        const seekTo = (x / width) * (recording.length / 1000)
        audio.currentTime = seekTo
        progress = seekTo / (recording.length / 1000)
      }}
    >
      <div transition:slide class="w-full h-1 bg-gray-200 rounded-md overflow-hidden">
        <div
          class="h-1 bg-brand-500 rounded-md"
          style="width: {progress * 100}%; transition: width 0.35s ease-in-out"
        ></div>
      </div>
    </div>
  {/if}
</div>
