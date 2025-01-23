import { checkAuth } from '../auth/pocketbase'
import { route } from '../stores/router.store'

export function navigateTo(path: string): void {
  // If no first / exists, add it
  path = path.startsWith('/') ? path : `/${path}`
  // Remove trailing /
  path = path.endsWith('/') ? path.slice(0, -1) : path

  if (path.startsWith('/login') || checkAuth()) {
    console.log('Navigating to', path)
    route.set(path)
  } else {
    route.set('/login')
  }
}
