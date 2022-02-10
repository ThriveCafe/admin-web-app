import ms from 'ms'
import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

const SwrConfig = ({ children }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: ms('10s'),
        errorRetryCount: 3,
        errorRetryInterval: ms('3s'),
        focusThrottleInterval: ms('30s'),
        refreshInterval: ms('5m'),
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SwrConfig

SWRConfig.propTypes = {
  children: PropTypes.element.isRequired,
}
