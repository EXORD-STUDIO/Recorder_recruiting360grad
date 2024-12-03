<script lang="ts">
  export let userName: string
  export let size: 'sm' | 'md' | 'lg' = 'md'

  $: tailwindSize = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }[size]

  let initials = userName
    .split(' ')
    .map((name) => name[0])
    .join('')
</script>

<div
  class="font-semibold bg-brand-600 text-white rounded-full flex justify-center items-center {tailwindSize}"
  class:text-lg={initials.length <= 2}
  class:text-sm={initials.length > 2}
>
  {initials}
</div>
