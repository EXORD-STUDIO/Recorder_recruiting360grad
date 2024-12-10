<script lang="ts">
  import { user } from '../stores/user.store'
  import Avatar from '../components/Avatar.svelte'
  import { currentRecording, stopRecording } from '../stores/recorder.store'
  import { navigateTo } from '../utils/navigate'
  import { bytesToMegaBytesString, getContactName, lengthToString } from '../utils/formatters'
  import { dialogs } from '../components/dialogs/dialogs.store'
  import { logout } from '../auth/pocketbase'
  import Dialogs from '../components/dialogs/Dialogs.svelte'

  export let currentlyActive: 'recordings' | 'start'

  const pages = [
    {
      name: 'Start',
      id: 'start',
      func: () => navigateTo('/')
    },
    {
      name: 'Alle Aufnahmen',
      id: 'recordings',
      func: () => navigateTo('/recordings')
    }
  ]

  function logoutDialog() {
    dialogs.add({
      title: 'Abmelden',
      message: 'Möchten Sie sich wirklich abmelden?',
      cancelText: 'Abbrechen',
      confirmText: 'Abmelden',
      onConfirm: () => {
        logout()
        navigateTo('/login')
      }
    })
  }
</script>

<Dialogs />

<div class="w-screen h-screen overflow-hidden flex flex-col">
  <div class="bg-brand-50 w-full flex gap-2 items-center justify-between px-3 py-2">
    <div class="flex items-center gap-4">
      <Avatar userName={$user?.name || ''} size="md" />
      <div>
        <h1 class="text font-semibold">{$user?.name}</h1>
        <p class="text-sm text-gray-500 -mt-1">{$user?.email}</p>
      </div>
    </div>
    <button on:click={logoutDialog}>
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
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
        />
      </svg>
    </button>
  </div>
  {#if $currentRecording}
    <div
      class="w-full bg-brand-50 flex gap-2 items-center justify-between px-3 py-2 border-t relative"
    >
      <!-- <div class="absolute left-0 h-2 bg-green-400">
        <AudioVisualisation audioAnalyser={$currentRecording.audioContext.createAnalyser()} />
      </div> -->
      <div>
        <h1 class="text font-semibold">
          {$currentRecording?.settings?.contact
            ? getContactName($currentRecording.settings.contact)
            : 'Unbekannt'}
        </h1>
        <p class="text-sm text-gray-500 -mt-1">
          {$currentRecording?.settings?.name}.mp3 |
          {lengthToString($currentRecording?.length || 0)} |
          {bytesToMegaBytesString($currentRecording?.size || 0)}
        </p>
      </div>
      <div>
        <button
          on:click={() => {
            stopRecording($currentRecording)
            navigateTo('/recordings')
          }}
          title="Aufnahme beenden"
          class="rounded-full h-8 w-8 bg-red-400 flex items-center justify-center"
        >
          <div class="w-3 h-3 rounded-sm bg-white"></div>
        </button>
      </div>
    </div>
  {/if}
  <div class="w-full flex bg-brand-50">
    {#each pages as page}
      <button
        class="w-1/2 py-2 text-center border-b-2"
        class:font-semibold={currentlyActive === page.id}
        class:text-brand={currentlyActive === page.id}
        class:border-brand={currentlyActive === page.id}
        on:click={() => page.func()}
      >
        {page.name}
      </button>
    {/each}
  </div>
  <div class="scroll-overlay overflow-x-hidden h-full">
    <slot></slot>
  </div>
</div>

<style>
  .scroll-overlay::-webkit-scrollbar {
    width: 7px;
  }
  .scroll-overlay::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10rem;
    border: 1px solid #fff;
  }

  .scroll-overlay::-webkit-scrollbar-track-piece:start {
    background: transparent;
  }

  .scroll-overlay::-webkit-scrollbar-track-piece:end {
    background: transparent;
  }
</style>
