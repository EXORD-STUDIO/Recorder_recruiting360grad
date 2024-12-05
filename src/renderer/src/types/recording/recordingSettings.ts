import type { UsersResponse } from '../pocketbase-types'

export interface RecordingSettings {
  micId: string
  desktopId: string
  user: UsersResponse
}
