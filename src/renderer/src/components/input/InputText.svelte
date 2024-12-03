<script lang="ts">
  import { onMount } from 'svelte'

  export let label: null | string = null
  export let editable: boolean = true
  export let name: string
  export let error: null | string = null
  export let success: null | string = null
  export let placeholder = ''
  export let value: string
  export let description: string | null = null
  export let isFocused = false
  export let loading = false
  export let onChange: (event: Event) => void = () => {}
  export let onBlur: () => void = () => {}

  let inputElement: HTMLInputElement

  onMount(() => {
    if (isFocused) inputElement.focus()
  })
</script>

<div>
  {#if label}
    <label for={name} class="block text-sm font-medium leading-6 text-gray-900 mb-2">{label}</label>
  {/if}
  <div class="relative rounded-md">
    <input
      readonly={!editable}
      tabindex={!editable ? -1 : 0}
      {name}
      {placeholder}
      bind:value
      on:input={onChange}
      on:blur={onBlur}
      id={name}
      type="text"
      autocomplete={name}
      class="block w-full rounded-md border-0 py-1.5 read-only:bg-brand-100 read-only:text-gray-900/60 read-only:cursor-not-allowed read-only:pointer-events-none {error
        ? 'pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
        : 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6'}"
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? 'input-error' : ''}
      bind:this={inputElement}
    />
    {#if loading}
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <div
          class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-gray-300"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    {:else if error}
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          class="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    {:else if success}
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-green-600"
      >
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
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    {/if}
  </div>
  {#if error}
    <p class="mt-2 text-sm text-red-600" id="input-error">
      {error}
    </p>
  {:else if success}
    <p class="mt-2 text-sm text-green-600" id="input-success">
      {success}
    </p>
  {:else if description}
    <p class="mt-2 text-sm text-gray-500" id="email-description">
      {description}
    </p>
  {/if}
</div>
