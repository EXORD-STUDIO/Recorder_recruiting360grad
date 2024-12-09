<script lang="ts">
  import { onMount } from 'svelte'
  import Base from '../layouts/Base.svelte'
  import type { Recording } from '../types/recording/recording'
  import { listRecordings } from '../utils/indexDb'
  import RecordingItem from '../components/RecordingItem.svelte'

  let recordings: Recording[] = []

  onMount(async () => {
    recordings = (await listRecordings()).sort((a, b) => b.createdAt - a.createdAt)
  })
</script>

<Base currentlyActive="recordings">
  <div class="flex flex-col gap-2 p-2">
    {#each recordings as recording, i}
      {#if i > 0 && recordings[i - 1].createdAt - recording.createdAt > 1000 * 60 * 60 * 24}
        <div class="w-full flex gap-2 items-center">
          <div class="w-full border-b border-gray-300"></div>
          <h1 class="font-semibold">
            {new Date(recording.createdAt).toLocaleDateString()}
          </h1>
          <div class="w-full border-b border-gray-300"></div>
        </div>
      {/if}
      <RecordingItem {recording} />
    {/each}
  </div>
</Base>
