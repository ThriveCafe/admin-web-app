import PropTypes from 'prop-types'

import SwrConfig from '@/modules/swr'

import ErrorBoundary from './error-boundary'
import Navigation from './navigation'
import Notifications from './notifications'
import User from './user'

const Modules = ({ children }) => {
  return (
    <ErrorBoundary>
      <Notifications>
        <User>
          <Navigation>
            <SwrConfig>{children}</SwrConfig>
          </Navigation>
        </User>
      </Notifications>
    </ErrorBoundary>
  )
}

export default Modules

Modules.propTypes = {
  children: PropTypes.element.isRequired,
}
