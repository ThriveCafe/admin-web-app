import { useRouter } from 'next/router'

import useSwr from '@/modules/swr/hooks/use-swr'

/**
 * HOC for zustand stores context provider integration with SWR
 *
 * @returns {function(*): function({data: *, [p: string]: *}): *}
 */

const withStore =
  ({ Provider, storeGenerator, swrConfig }) =>
  (Component) =>
    function ComponentWithStore({ data, ...props }) {
      const { query } = useRouter()

      const store = storeGenerator(data)

      useSwr({
        ...swrConfig(data, query),
        store,
      })

      return (
        <Provider createStore={() => store}>
          <Component {...props} data={data} />
        </Provider>
      )
    }

export default withStore
