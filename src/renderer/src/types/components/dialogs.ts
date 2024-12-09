import type { Writable } from 'svelte/store'

export interface Dialog {
  id: string
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  lightDismiss?: boolean
}

export interface DialogStore extends Writable<Dialog[]> {
  add: (props: Omit<Dialog, 'id'> & Partial<Pick<Dialog, 'id'>>) => string
  remove: (id: string) => void
}
