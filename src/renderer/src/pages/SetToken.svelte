<script lang="ts">
  import { onMount } from 'svelte'
  import { login } from '../auth/pocketbase'
  import { navigateTo } from '../utils/navigate'
  import Loading from './Loading.svelte'

  export let token: string | null
  export let url: string | null

  console.log('Token:', token)
  console.log('URL:', url)

  let loginError = ''

  onMount(async () => {
    console.log('Token:', token)
    if (token && url) {
      try {
        await login(decodeURIComponent(token), decodeURIComponent(url))
        navigateTo('/')
      } catch (error) {
        loginError = 'Etwas ist schiefgelaufen! Bitte versuchen Sie es erneut.'
        console.error(error)
      }
    }
  })
</script>

{#if loginError}
  <div class="text-red-500 text-center mt-4">{loginError}</div>
{:else}
  <Loading />
{/if}
