import { always } from 'ramda'

import capitalize from '@/utils/capitalize'

const swrStoreDefaults = (key = 'data', initialData = undefined) => ({
  [key]: initialData,
  [`${key}Error`]: undefined,
  [`${key}IsValidating`]: false,
  [`mutate${capitalize(key)}`]: always(() => {}),
})

export default swrStoreDefaults
