<script lang="ts">
  import { user } from '../stores/user.store'
  import Avatar from '../components/Avatar.svelte'
  import { currentRecording, stopRecording } from '../stores/recorder.store'
  import { navigateTo } from '../utils/navigate'
  import { bytesToMegaBytesString, getContactName, lengthToString } from '../utils/formatters'

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
</script>

<div class="w-screen h-screen overflow-hidden flex flex-col">
  <div class="bg-brand-50 w-full flex gap-2 items-center justify-between px-3 py-2">
    <div class="flex items-center gap-4">
      <Avatar userName={$user?.name || ''} size="md" />
      <div>
        <h1 class="text font-semibold">{$user?.name}</h1>
        <p class="text-sm text-gray-500 -mt-1">{$user?.email}</p>
      </div>
    </div>
    <button>
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
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
          {lengthToString($currentRecording?.length || 0)} |
          {bytesToMegaBytesString($currentRecording?.size || 0)}
        </p>
      </div>
      <div>
        <button
          on:click={() => stopRecording($currentRecording)}
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
  <div class="overflow-y-auto overflow-x-hidden h-full">
    <slot></slot>
  </div>
</div>
