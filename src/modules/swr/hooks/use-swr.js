import { identity, pipe, propOr } from 'ramda'
import { useEffect } from 'react'
import useSWR from 'swr'

import capitalize from '@/utils/capitalize'

import useAuth from '../../user/stores/use-auth'

const loggedInSelector = pipe(propOr(null, 'current'), Boolean)

/**
 * Modified Swr Hook
 *
 * @returns {{mutate: *, data, error: *, isValidating: *}}
 */

const useSwr = ({
  key = '',
  condition,
  initialData,
  fetcher = identity,
  options = {},
  store,
  isProtected = false,
  storeKey = 'data',
}) => {
  const isLoggedIn = useAuth(loggedInSelector)

  const finalCondition = condition || isProtected ? isLoggedIn : true

  const {
    data = initialData,
    error,
    isValidating,
    mutate,
  } = useSWR(finalCondition ? key : null, fetcher, {
    initialData,
    ...options,
  })

  useEffect(() => {
    if (store) {
      store.setState({ [storeKey]: data })
    }
  }, [data, store, storeKey])

  useEffect(() => {
    if (store) {
      store.setState({ [`${storeKey}Error`]: error })
    }
  }, [error, store, storeKey])

  useEffect(() => {
    if (store) {
      store.setState({ [`${storeKey}IsValidating`]: isValidating })
    }
  }, [isValidating, store, storeKey])

  useEffect(() => {
    if (store) {
      store.setState({ [`mutate${capitalize(storeKey)}`]: mutate })
    }
  }, [mutate, store, storeKey])

  return { data, error, isValidating, mutate }
}

export default useSwr
