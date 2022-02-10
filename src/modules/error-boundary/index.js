import PropTypes from 'prop-types'
import { useCallback, useMemo } from 'react'
import { ErrorBoundary as ErrorBoundaryModule } from 'react-error-boundary'

import useToggle from '@/hooks/use-toggle'

import Fallback from './components/fallback'

const ErrorBoundary = ({ children }) => {
  const [crashed, toggleCrashed] = useToggle(false)

  const onError = useCallback(
    (error) => {
      toggleCrashed(true)
      // eslint-disable-next-line no-console
      console.error(error)
    },
    [toggleCrashed],
  )

  const onReset = useCallback(() => toggleCrashed(false), [toggleCrashed])

  const resetKeys = useMemo(() => [crashed], [crashed])

  return (
    <ErrorBoundaryModule
      FallbackComponent={Fallback}
      onError={onError}
      onReset={onReset}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundaryModule>
  )
}

export default ErrorBoundary

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
}
