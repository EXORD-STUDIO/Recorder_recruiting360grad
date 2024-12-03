<script lang="ts">
  export let isFormLoading: boolean = false
  export let disabled: boolean = false
  export let formStatus: string | null = null
  export let text: string
  export let successText: string = text
  export let onClick: () => void = () => {}
</script>

<button
  on:click={onClick}
  disabled={disabled || isFormLoading}
  class={`${disabled ? 'bg-brand-300 pointer-events-none cursor-not-allowed' : 'bg-brand-600'} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600`}
  type="submit"
>
  {#if isFormLoading}
    <div
      class="inline-block h-6 w-6 p-2 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-gray-300"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  {:else if formStatus === 'success' || formStatus === 'redirect'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="size-5 text-primary-content"
    >
      <path
        fill-rule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clip-rule="evenodd"
      />
    </svg>
    {successText}
  {:else}
    {text}
  {/if}
</button>
