<script lang="ts">
  import type { Recording } from '../types/recording/recording'
  import { getContactName, lengthToString, timeStampToString } from '../utils/formatters'

  export let recording: Recording
</script>

<div class="w-full rounded-md px-2 py-2 bg-brand-50">
  <div>
    <h1 class="font-semibold">
      {recording.contact ? getContactName(recording.contact) : 'Unbekannt'}
    </h1>
    <p class="text-sm text-gray-500">
      {timeStampToString(recording.createdAt)} | {lengthToString(recording.length)} min
    </p>
  </div>
  <audio src={recording.fileURI}></audio>
</div>
