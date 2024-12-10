<script lang="ts">
  import Home from './pages/Home.svelte'
  import Login from './pages/Login.svelte'
  import { initAuth } from './auth/pocketbase'
  import { onMount } from 'svelte'
  import { navigateTo } from './utils/navigate'
  import SetToken from './pages/SetToken.svelte'
  import Loading from './pages/Loading.svelte'
  import Recordings from './pages/Recordings.svelte'
  import { startListening, stopListening } from './stores/currentContact.store'
  import { currentRecording } from './stores/recorder.store'
  import { user } from './stores/user.store'
  import { route } from './stores/router.store'

  export let url = ''
  export let loading = false

  window.electron.ipcRenderer.on('deeplink', (_, deeplink: string) => {
    const indexof = deeplink.indexOf('://')
    const url = decodeURI(deeplink.slice(indexof + 3))
    console.log('Deeplink:', url)
    navigateTo(url)
  })

  $: if ($currentRecording && $currentRecording.mediaRecorder.state === 'recording') {
    stopListening()
  } else if ($user) {
    startListening()
  }

  function getURLParams(keyUrl: string, url: string, key: string): string {
    const keyParams = keyUrl.split('/')
    const params = url.split('/')
    const index = keyParams.indexOf(key)
    return decodeURIComponent(params[index])
  }

  onMount(async () => {
    loading = true
    console.log('URL:', url)
    if (!url.startsWith('/login')) {
      try {
        await initAuth()
        startListening()
      } catch (error) {
        console.log('Auth fehlgeschlagen. Redirect to login page')
        // Redirect to login page
        navigateTo('/login/')
      }
    }
    loading = false
  })
</script>

<div>
  {#if loading}
    <Loading />
  {:else}
    <div class="w-screen h-screen">
      {#if $route === '/'}
        <Home />
      {:else if $route === '/recordings'}
        <Recordings />
      {:else if $route === '/login'}
        <Login />
      {:else if $route.startsWith('/login/set-token')}
        <SetToken
          url={getURLParams('/login/set-token/:url/:token', $route, ':url')}
          token={getURLParams('/login/set-token/:url/:token', $route, ':token')}
        />
      {/if}
    </div>
  {/if}
</div>
