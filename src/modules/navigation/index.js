import PropTypes from 'prop-types'

import AppBar from './app-bar'

const Navigation = ({ children }) => {
  return (
    <div className='h-full w-full bg-gray-50 lg:flex'>
      <AppBar />
      <div className='h-full w-full flex-1 overflow-auto'>{children}</div>
    </div>
  )
}

export default Navigation

Navigation.propTypes = {
  children: PropTypes.element.isRequired,
}
