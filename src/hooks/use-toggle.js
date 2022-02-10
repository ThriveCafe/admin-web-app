import { useCallback, useState } from 'react'

/**
 * This is a custom hook to create and control a boolean value
 *
 * @param {boolean} [initialState=false]
 * @returns {[boolean,(function(*): void)]}
 */

const useToggle = (initialState = false) => {
  const [state, toggle] = useState(Boolean(initialState))

  const toggleFn = useCallback(
    (payload) =>
      toggle((prevState) =>
        typeof payload === 'function'
          ? payload(prevState)
          : payload !== undefined
          ? Boolean(payload)
          : !prevState,
      ),
    [],
  )

  return [state, toggleFn]
}

export default useToggle
