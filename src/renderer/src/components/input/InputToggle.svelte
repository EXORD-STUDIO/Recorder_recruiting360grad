<script lang="ts">
  export let checked = false
  export let onChange: (checked: boolean) => void
  export let title: string
  export let description: string | null = null
</script>

<div class="flex items-center justify-between gap-2">
  <span class="flex flex-grow flex-col">
    <span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">{title}</span>
    {#if description}
      <span class="text-sm text-gray-500" id="availability-description">{description}</span>
    {/if}
  </span>
  <button
    on:click={() => {
      onChange(!checked)
      checked = !checked
    }}
    type="button"
    class="{checked
      ? 'bg-brand-600'
      : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
    role="switch"
    aria-checked={checked}
    aria-labelledby="availability-label"
    aria-describedby="availability-description"
  >
    <span
      aria-hidden="true"
      class="{checked
        ? 'translate-x-5'
        : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
    ></span>
  </button>
</div>
