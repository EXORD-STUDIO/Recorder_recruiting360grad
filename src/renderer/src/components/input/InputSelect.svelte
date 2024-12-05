<script lang="ts">
  import { createListbox } from 'svelte-headlessui'
  import type { SelectItem } from '../../types/components/SelectItem'

  export let value: string | null = null
  export let options: SelectItem[] = []
  export let placeholder: string = 'Select an item'
  export let disabled: boolean = false
  export let onSelect: (value: string) => void = () => {}
  export let preselectName: string | null = null

  let listbox = createListbox({
    label: 'Actions',
    selected: null
  })

  $: listbox.set({
    selected: preselectName
      ? options.find((o) => o.name === preselectName)
      : options.find((o) => o.id === value)
  })

  function onChange(e: Event): void {
    onSelect((e as CustomEvent).detail.selected.id)
  }
</script>

<div class="w-full relative">
  <button
    use:listbox.button
    on:change={onChange}
    class="input relative flex items-center gap-2 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
    {disabled}
  >
    <span class="block truncate">{$listbox.selected?.name || placeholder}</span>
    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="size-5"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </button>

  {#if $listbox.expanded}
    <ul
      use:listbox.items
      class="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      {#each options as value}
        {@const active = $listbox.active === value}
        {@const selected = $listbox.selected === value}
        <li
          class="relative flex items-center gap-2 cursor-default select-none py-2 px-3 {active
            ? 'bg-brand-200'
            : 'text-gray-900'}"
          use:listbox.item={{ value }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="size-4"
            class:opacity-0={!selected}
          >
            <path
              fill-rule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="block truncate text-sm {selected ? 'font-semibold' : 'font-normal'}">
            {value.name}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
