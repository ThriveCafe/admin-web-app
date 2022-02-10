import produce from 'immer'

/**
 * Immer middleware for zustand stores
 *
 * @param config
 * @returns {function(*, *, *): *}
 */
const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState =
        typeof partial === 'function' ? produce(partial) : partial
      return set(nextState, replace)
    },
    get,
    api,
  )

export default immer
