<script lang="ts">
  import { onMount } from 'svelte'
  import InputSelect from '../components/input/InputSelect.svelte'
  import Base from '../layouts/Base.svelte'
  import { currentRecording, startRecording } from '../stores/recorder.store'
  import { currentContact } from '../stores/currentContact.store'
  import InputText from '../components/input/InputText.svelte'
  import InputToggle from '../components/input/InputToggle.svelte'
  import { getContactName } from '../utils/formatters'

  let micId = 'default'
  let possibleMics = null
  let name = 'DSGVO'

  let errorMessage = ''
  let micAccess = true
  let screenAccess = true

  async function getMics(): Promise<void> {
    possibleMics = await navigator.mediaDevices.enumerateDevices().then((devices) => {
      if (!devices) {
        return []
      }
      console.log(devices)
      return devices
        .filter((device) => device.kind === 'audioinput')
        .map((device) => {
          return {
            id: device.deviceId,
            name: device.label
          }
        })
    })
  }

  function checkAccess(): boolean {
    // Check access to microphone
    if (!navigator.mediaDevices.getUserMedia) {
      console.error('getUserMedia not supported')
      micAccess = false
    }

    // Check access to screen
    if (!navigator.mediaDevices.getDisplayMedia) {
      console.error('getDisplayMedia not supported')
      screenAccess = false
    }

    return micAccess && screenAccess && possibleMics?.length > 0
  }

  async function record(): Promise<void> {
    if (!checkAccess()) {
      return
    }
    try {
      await startRecording({
        name: name,
        micId: micId,
        contact: $currentContact
      })
      errorMessage = ''
    } catch (error) {
      errorMessage = error.message
    }
  }

  onMount(() => {
    checkAccess()
    getMics()
  })
</script>

<Base currentlyActive="start">
  <div class="h-full">
    {#if !$currentRecording}
      <div class="p-3 flex flex-col gap-5">
        {#if errorMessage}
          <div class="bg-red-100 p-2 rounded-md">
            <p class="text-sm text-red-800">Es gab einen Fehler!</p>
            <p class="text-xs text-red-800 opacity-50">Fehlercode: {errorMessage}</p>
          </div>
        {/if}
        {#if !micAccess}
          <div class="bg-red-100 p-2 rounded-md">
            <p class="text-sm text-red-800">Kein Zugriff auf ein Mikrofon.</p>
          </div>
        {/if}
        {#if !screenAccess}
          <div class="bg-red-100 p-2 rounded-md">
            <p class="text-sm text-red-800">Kein Zugriff auf den Bildschirm-Ton.</p>
          </div>
        {/if}
        {#if possibleMics && possibleMics.length === 0}
          <div class="bg-red-100 p-2 rounded-md">
            <p class="text-sm text-red-800">
              Kein Mikrofon gefunden. Bitte schließen Sie ein Mikrofon an
            </p>
          </div>
        {/if}
        <InputSelect
          bind:value={micId}
          options={possibleMics || []}
          label="Mikrofon"
          placeholder="Select a microphone"
          onSelect={(value) => {
            micId = value
          }}
        />
        {#if $currentContact}
          <div>
            <label for={name} class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Ausgewählter Kontakt</label
            >
            <div class="bg-brand-50 rounded-md flex flex-col p-2">
              <div>
                <span class="text-sm font-medium leading-6 text-gray-900"
                  >{getContactName($currentContact)}</span
                >
                <span class="text-sm text-gray-500">{$currentContact.reg_no}</span>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Um einen anderen Kontakt auszuwählen, öffnen Sie ihn in der Web-App.
            </p>
          </div>
        {:else}
          <div class="bg-brand-100 p-2 rounded-md">
            <div class="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Ausgewählter Kontakt
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Kein Kontakt ausgewählt. Um einen Kontakt auszuwählen, öffnen Sie ihn in der Web-App.
            </p>
          </div>
        {/if}
        <InputText bind:value={name} placeholder="Name" label="Name der Aufzeichnung" name="name" />
        <InputToggle
          title="DSGVO"
          description="Es handelt sich um eine Aufzeichnung zur Einwilligung nach DSGVO."
          checked={name === 'DSGVO'}
          onChange={(checked) => {
            name = checked ? 'DSGVO' : ''
          }}
        />
        <button class="btn btn-primary" on:click={record}>Aufnahme starten</button>
      </div>
    {:else if $currentRecording}
      <div class="p-3 flex flex-col gap-5 h-full w-full justify-center items-center">
        Aufzeichnung für {getContactName($currentContact)} läuft.
      </div>
    {/if}
  </div>
</Base>
