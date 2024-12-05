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
    {#each recordings as recording}
      <RecordingItem {recording} />
    {/each}
  </div>
</Base>
