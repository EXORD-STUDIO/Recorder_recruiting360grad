import type { ContactsResponse } from '../types/pocketbase-types'

export function getContactName(contact: ContactsResponse): string {
  if (contact.first_name && contact.last_name) {
    return `${contact.first_name} ${contact.last_name}`
  } else if (contact.first_name) {
    return contact.first_name
  } else if (contact.last_name) {
    return contact.last_name
  } else if (contact.company) {
    return contact.company
  } else {
    return 'Unknown'
  }
}

/**
 * Converts a length in milliseconds to a string representation
 * @param length
 */
export function lengthToString(length: number): string {
  const minutes = Math.floor(length / 60000)
  const seconds = ((length % 60000) / 1000).toFixed(0)
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
}

/**
 * Converts a number of bytes to a string representation in MB
 * @param bytes The number of bytes to convert to a string
 * @returns The number of bytes as a string in the format "X MB"
 */
export function bytesToMegaBytesString(bytes: number): string {
  const mb = bytes / 1024 / 1024
  return `${mb.toFixed(2)} MB`
}

/**
 * Converts a timestamp to a string representation
 * @param timeStamps The timestamp to convert
 * @returns The timestamp as a string
 */
export function timeStampToString(timeStamps: number): string {
  const date = new Date(timeStamps)
  return date.toLocaleString()
}
