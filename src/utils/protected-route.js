import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useAuth from '@/modules/user/stores/use-auth'

const ProtectedRoute = (
  PageComponent,
  { preventLoggedInUsers = false } = {},
) => {
  return function ProtectedPage(props) {
    const router = useRouter()

    const initialized = useAuth.use.initialized()
    const currentUser = useAuth.use.current()

    useEffect(() => {
      ;(async () => {
        if (initialized) {
          if (preventLoggedInUsers && currentUser) {
            await router.push('/')
          } else if (!preventLoggedInUsers && !currentUser) {
            await router.push('/auth/login')
          }
        }
      })()
    }, [currentUser, initialized, router])

    return (preventLoggedInUsers && currentUser) ||
      (!preventLoggedInUsers && !currentUser) ? null : (
      <PageComponent {...props} />
    )
  }
}

export default ProtectedRoute
