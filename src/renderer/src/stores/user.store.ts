import { writable, type Writable } from 'svelte/store'
import { Collections, type UsersResponse } from '../types/pocketbase-types'
import { pb } from '../auth/pocketbase'

export const user: Writable<UsersResponse | null> = writable(null)

export async function loadUser(): Promise<void> {
  if (!pb) {
    return
  }
  try {
    const userResponse = await pb.collection(Collections.Users).getOne(pb.authStore.record.id)
    user.set(userResponse)
  } catch (e) {
    console.error('Error loading user', e)
  }
}
