<script>
  import Dialog from './Dialog.svelte'
  import { dialogs } from './dialogs.store'
</script>

{#each $dialogs as dialog}
  <Dialog {dialog} />
{/each}
