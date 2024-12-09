import { writable } from 'svelte/store'
import type { DialogStore } from '../../types/components/dialogs'

export const dialogs: DialogStore = writable([]) as DialogStore

function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

dialogs.add = ({ id = getUniqueId(), ...props }) => {
  const addedDialog = { id, ...props }

  dialogs.update((existingDialogs) => {
    const isExistingId = existingDialogs.findIndex((n) => n.id === id) !== -1

    if (isExistingId) {
      console.warn(`Dialog with id ${id} already exists`)
      return existingDialogs
    }

    return [addedDialog, ...existingDialogs]
  })

  return id
}

dialogs.remove = (id) => {
  dialogs.update((dialogs) => dialogs.filter((n) => n.id !== id))
}
