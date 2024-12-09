import { writable, type Writable } from 'svelte/store'
import { Collections, type ContactsResponse } from '../types/pocketbase-types'
import { pb } from '../auth/pocketbase'

export const currentContact: Writable<ContactsResponse | null> = writable(null)

let listen = false

export function startListening(): void {
  if (listen) {
    return
  }

  try {
    pb.collection(Collections.Users)
      .getOne(pb.authStore.record.id, {
        expand: 'last_viewed_contact'
      })
      .then((data) => {
        const contact = (data.expand as { last_viewed_contact: ContactsResponse })
          ?.last_viewed_contact

        currentContact.set(contact)
      })
  } catch (e) {
    console.log(e)
  }

  pb?.collection(Collections.Users).subscribe(
    pb.authStore.record.id,
    (data) => {
      console.log('Data', data)
      const contact = (data.record.expand as { last_viewed_contact: ContactsResponse })
        ?.last_viewed_contact

      console.log('Contact', contact.first_name)

      currentContact.set(contact)
    },
    {
      expand: 'last_viewed_contact'
    }
  )
  listen = true
}

export function stopListening(): void {
  pb?.collection(Collections.Users).unsubscribe(pb.authStore.record.id)
  listen = false
}
