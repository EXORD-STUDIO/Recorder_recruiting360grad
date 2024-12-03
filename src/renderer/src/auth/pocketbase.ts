import { user } from '../stores/user.store'
import { PBAuthSettingsKey, type PBAuthSettings } from '../types/auth/PBAuthSettings'
import { Collections, type TypedPocketBase } from '../types/pocketbase-types'
import PocketBase, { LocalAuthStore } from 'pocketbase'

export let pb: TypedPocketBase | null = null

export async function initAuth(
  baseUrl?: string | undefined,
  authStore?: LocalAuthStore | undefined
): Promise<void> {
  const settings: PBAuthSettings = JSON.parse(
    window.localStorage.getItem(PBAuthSettingsKey) || '{}'
  )

  if (!settings.baseUrl) {
    throw new Error('Invalid PocketBase auth settings')
  }

  pb = new PocketBase(baseUrl || settings.baseUrl, authStore)

  // pb.afterSend = (response, data): unknown => {
  //   if (response.status === 401) {
  //     pb.authStore.clear()
  //     window.location.href = '/login'
  //   }

  //   return data
  // }

  const userResponse = await pb.collection(Collections.Users).authRefresh()

  if (userResponse) {
    user.set(userResponse.record)
  }
}

export async function login(authToken: string, baseUrl: string): Promise<void> {
  baseUrl = new URL(baseUrl).origin

  const settings: PBAuthSettings = JSON.parse(
    window.localStorage.getItem(PBAuthSettingsKey) || '{}'
  )

  window.localStorage.setItem(PBAuthSettingsKey, JSON.stringify({ ...settings, baseUrl }))

  const authStore = new LocalAuthStore()
  authStore.save(authToken)

  await initAuth(baseUrl, authStore)
}

export function logout(): void {
  pb.authStore.clear()
  pb = null
}

export function checkAuth(): boolean {
  return pb && pb.authStore.isValid
}
