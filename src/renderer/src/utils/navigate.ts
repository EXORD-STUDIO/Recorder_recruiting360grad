import { checkAuth } from '../auth/pocketbase'
import { route } from '../stores/router.store'

export function navigateTo(path: string): void {
  // If no first / exists, add it
  path = path.startsWith('/') ? path : `/${path}`

  if (path.startsWith('/login') || checkAuth()) {
    console.log('Navigating to', path)
    route.set(path)
  } else {
    route.set('/login')
  }
}
