import type { ContactsResponse } from '../pocketbase-types'

export interface Recording {
  id: string
  name: string
  createdAt: number
  contact: ContactsResponse
  size: number
  length: number
  uploaded: boolean
  fileURI: string
}
