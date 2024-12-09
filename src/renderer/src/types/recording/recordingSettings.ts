import type { ContactsResponse } from '../pocketbase-types'

export interface RecordingSettings {
  micId: string
  name: string
  contact: ContactsResponse
}
