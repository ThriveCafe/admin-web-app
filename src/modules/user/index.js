import PropTypes from 'prop-types'
import { useEffect } from 'react'

import useAuth from './stores/use-auth'

const User = ({ children }) => {
  const initializeAuth = useAuth.use.initialize()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return children
}

export default User

User.propTypes = {
  children: PropTypes.element.isRequired,
}
