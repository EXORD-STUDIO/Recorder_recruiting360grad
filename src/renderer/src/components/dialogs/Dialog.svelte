<script>
  import { onMount } from 'svelte'
  import { dialogs } from './dialogs.store'
  import Loader from '../Loader.svelte'

  export let dialog
  const {
    id, // Will be set automatically if not provided
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    lightDismiss = true // User can dismiss the modal by clicking outside of it
  } = dialog

  let loading = false
  let dialogRef

  function show() {
    dialogRef.showModal()
  }

  function handleBackgroundClick() {
    if (lightDismiss === false) return

    dialogRef.close()
  }

  function handleClose() {
    if (onCancel) onCancel()

    dialogs.remove(id)
  }

  async function handleConfirm() {
    if (onConfirm) {
      loading = true
      await onConfirm()
      loading = false
    }

    dialogs.remove(id)
  }

  onMount(show)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="rounded-lg shadow-xl max-w-lg"
  bind:this={dialogRef}
  on:close={handleClose}
  on:click={handleBackgroundClick}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="p-4 relative" on:click|stopPropagation>
    {#if loading}
      <div class="flex absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-10">
        <Loader />
      </div>
    {/if}
    <div class:opacity-50={loading}>
      <h3 class="text-lg font-bold">{title}</h3>
      <p class="py-4">{@html message}</p>
      <div class="">
        <div class="flex gap-2">
          {#if cancelText || onCancel}
            <button class="btn btn-secondary" on:click={handleClose}
              >{cancelText || 'Abbrechen'}</button
            >
          {/if}
          {#if confirmText || onConfirm}
            <button class="btn btn-primary" on:click|stopPropagation={handleConfirm} autofocus
              >{confirmText || 'Okay'}</button
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    background-color: theme('colors.gray.500 / 75%');
  }
</style>
