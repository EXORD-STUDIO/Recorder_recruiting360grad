<script lang="ts">
  import InputText from '../components/input/InputText.svelte'
  import InputSubmit from '../components/input/InputSubmit.svelte'
  import { PBAuthSettingsKey, type PBAuthSettings } from '../types/auth/PBAuthSettings'

  let url =
    (JSON.parse(window.localStorage.getItem(PBAuthSettingsKey) || '{}') as PBAuthSettings)
      .frontendUrl || ''
  let urlError = ''

  function validateUrl(url: string): string | null {
    if (!url) return null
    try {
      const urlObject = new URL(url)
      const settings = JSON.parse(window.localStorage.getItem(PBAuthSettingsKey) || '{}')
      window.localStorage.setItem(
        PBAuthSettingsKey,
        JSON.stringify({ ...settings, frontendUrl: urlObject.origin })
      )
      urlError = ''
      return urlObject.origin
    } catch (error) {
      urlError = 'Bitte geben Sie eine gültige URL ein'
      return null
    }
  }

  function startLogin(): void {
    const url = JSON.parse(window.localStorage.getItem(PBAuthSettingsKey) || '{}').frontendUrl
    window.open(url + '/auth/app-login?app=recorder&appname=360GradRecorder', '_blank')
  }

  function onChange(event: Event): void {
    url = (event.target as HTMLInputElement).value
    validateUrl(url)
  }

  function onBlur(): void {
    url = validateUrl(url)
  }
</script>

<div class="flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm -mt-10">
    <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="post" on:submit|preventDefault={startLogin}>
      <InputText
        label="Url von Recruiting360Grad"
        name="url"
        error={urlError}
        value={url}
        {onChange}
        {onBlur}
      />
      <InputSubmit text="Login" disabled={!(url && !urlError)} />
    </form>
  </div>
</div>
