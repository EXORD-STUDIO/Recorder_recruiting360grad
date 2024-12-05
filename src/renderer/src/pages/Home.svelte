<script lang="ts">
  import { onMount } from 'svelte'
  import InputSelect from '../components/input/InputSelect.svelte'
  import Base from '../layouts/Base.svelte'
  import { currentRecording, startRecording, stopRecording } from '../stores/recorder.store'

  let micId = 'default'
  let possibleMics = []

  async function getMics(): Promise<void> {
    possibleMics = await navigator.mediaDevices.enumerateDevices().then((devices) => {
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
  onMount(() => {
    getMics()
  })
</script>

<Base currentlyActive="start">
  <div class="h-full">
    <h1>Home</h1>
    <p>Welcome to the home page.</p>
    <div class="pt-10">Recording is {$currentRecording ? 'running' : 'not running'}</div>
    <div>
      <InputSelect
        bind:value={micId}
        options={possibleMics}
        placeholder="Select a microphone"
        onSelect={(value) => {
          micId = value
        }}
      />
    </div>
    <div class="flex p-4 gap-2">
      <button
        class="btn btn-primary"
        on:click={() =>
          startRecording({
            desktopId: '',
            micId: '',
            contact: null
          })}>Start Recording</button
      >
      <button
        class="btn btn-primary"
        on:click={() => {
          stopRecording($currentRecording)
        }}>Stop Recording</button
      >
    </div>
    {#if $currentRecording}
      <div class="p-4">
        <p>Size: {$currentRecording.size}</p>
        <p>Länge: {$currentRecording.length}</p>
      </div>
    {/if}
  </div>
</Base>
