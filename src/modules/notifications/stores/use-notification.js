import { findIndex, propEq, propOr } from 'ramda'
import { v4 as uuid } from 'uuid'

import { NOTIFICATION_TIMEOUT } from '@/config/notifications'
import capitalize from '@/utils/capitalize'
import createStore from '@/utils/store/create-store'

const useNotification = createStore((set, get) => ({
  queue: [],
  addNotification: (type, message) => {
    const config = {
      id: uuid(),
      type,
      title: '',
      text: '',
    }

    if (typeof message === 'string') {
      config.title = capitalize(type)
      config.text = message
    } else {
      config.title = propOr('Alert', 'title')(message)
      config.text = propOr('', 'text')(message)
    }

    set((state) => {
      state.queue.push(config)
    })

    setTimeout(() => {
      get().clearNotification(config.id)
    }, NOTIFICATION_TIMEOUT)

    return config
  },
  clearNotification: (id) => {
    const { queue: existingQueue } = get()
    const index = findIndex(propEq('id', id))(existingQueue)

    if (index !== -1) {
      set((state) => {
        state.queue.splice(index, 1)
      })

      return existingQueue[index]
    }

    return false
  },
}))

export default useNotification
