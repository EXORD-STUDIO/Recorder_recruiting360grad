import type { ContactsResponse } from '../pocketbase-types'

export interface RecordingSettings {
  micId: string
  desktopId: string
  contact: ContactsResponse
}
