import { navigate } from 'svelte-routing'
import { checkAuth } from '../auth/pocketbase'

export function navigateTo(path: string): void {
  // If no first / exists, add it
  path = path.startsWith('/') ? path : `/${path}`

  if (path.startsWith('/login') || checkAuth()) {
    console.log('Navigating to', path)
    navigate(path)
  } else {
    navigate('/login')
  }
}
