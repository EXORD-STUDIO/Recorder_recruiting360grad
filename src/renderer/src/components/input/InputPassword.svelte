<script lang="ts">
  export let label: string
  export let value: string = ''
  export let name: string
  export let passwordResetLink: string | null = null
  export let description: string | null = null
  export let error: string | null = null

  let isPasswordVisible = false

  function toggleVisibility(): void {
    isPasswordVisible = !isPasswordVisible
  }
</script>

<div>
  <div class="flex items-center justify-between">
    <label for={name} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    {#if passwordResetLink}
      <div class="text-sm">
        <a href={passwordResetLink} class="font-semibold text-brand-600 hover:text-brand-500"
          >Passwort vergessen?</a
        >
      </div>
    {/if}
  </div>
  <div class="relative mt-2 rounded-md">
    <input
      id={name || 'password'}
      {name}
      type={isPasswordVisible ? 'text' : 'password'}
      autocomplete="current-password"
      {value}
      class={error
        ? 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
        : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6'}
    />
    <button
      on:click={toggleVisibility}
      type="button"
      class="absolute inset-y-0 right-0 flex items-center pr-3 {error
        ? 'text-red-500'
        : 'text-gray-400'}"
    >
      {#if isPasswordVisible}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5"
        >
          <path
            fill-rule="evenodd"
            d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
            clip-rule="evenodd"
          />
          <path
            d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5"
        >
          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path
            fill-rule="evenodd"
            d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            clip-rule="evenodd"
          />
        </svg>
      {/if}
    </button>
  </div>
  {#if error}
    <p class="mt-2 text-sm text-red-600" id="input-error">
      {error}
    </p>
  {:else if description}
    <p class="mt-2 text-sm text-gray-500" id="email-description">
      {description}
    </p>
  {/if}
</div>
