import { Auth, Hub } from 'aws-amplify'
import Router from 'next/router'

import createStore from '@/utils/store/create-store'

const useAuth = createStore((set, get) => ({
  initialized: false,
  current: null,
  initialize: async () => {
    const { initialized } = get()

    if (initialized) {
      return
    }

    const user = await Auth.currentAuthenticatedUser().catch(() => null)

    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          set({
            current: await Auth.currentAuthenticatedUser(),
          })
          break
        case 'signUp':
          await Router.push(
            `/auth/verify-email?email=${encodeURIComponent(
              data.payload.data.user.username,
            )}`,
          )
          break
        case 'signOut':
          set({ current: null })
          break
        case 'tokenRefresh_failure':
          await Auth.signOut()
          break
        default:
      }
    })

    set({ initialized: true, current: user })
  },
}))

export default useAuth
