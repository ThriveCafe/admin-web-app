import { pathOr } from 'ramda'

import useNotification from '@/modules/notifications/stores/use-notification'

const handleApiError = (error) => {
  const errorMessage = pathOr('', ['response', 'data', 'error'])(error)

  useNotification
    .getState()
    .addNotification('error', errorMessage || error.message)
}

export default handleApiError
