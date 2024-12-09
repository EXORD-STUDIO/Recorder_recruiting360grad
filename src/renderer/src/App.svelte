<script lang="ts">
  import { Router, Route } from 'svelte-routing'
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

  export let url = ''
  export let loading = false

  const basepath = /^\/?[a-zA-Z]+:/.test(window.location.pathname)
    ? window.location.pathname.substring(0, window.location.pathname.indexOf(':') + 1)
    : '/'

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

<Router bind:url {basepath}>
  {#if loading}
    <Loading />
  {:else}
    <div class="w-screen h-screen">
      <Route path="/" component={Home} />
      <Route path="/recordings" component={Recordings} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/login/set-token/:url/:token" let:params>
        <SetToken url={params.url} token={params.token} />
      </Route>
    </div>
  {/if}
</Router>
