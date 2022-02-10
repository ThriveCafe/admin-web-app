import { identity } from 'ramda'
import createContext from 'zustand/context'

import swrStoreDefaults from '@/modules/swr/utils/swr-store-defaults'

import createStore from './create-store'
import withStore from './with-store'

/**
 * Creates a Zustand store with React context and option to connect an SWR hook for data fetching
 */

const createStoreWithContext = (
  createState = identity,
  swrConfig = undefined,
) => {
  let Store

  const { Provider, useStore } = createContext()

  const generator = (initialData) => {
    if (!Store) {
      Store = createStore((set, get) =>
        createState(
          set,
          get,
          swrConfig ? swrStoreDefaults(swrConfig()?.storeKey, initialData) : {},
        ),
      )
    }

    return Store
  }

  return {
    withStore: withStore({
      Provider,
      storeGenerator: generator,
      swrConfig,
    }),
    useStore,
  }
}

export default createStoreWithContext
