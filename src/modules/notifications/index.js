import PropTypes from 'prop-types'

import Simple from './components/simple'
import useNotification from './stores/use-notification'

const Notifications = ({ children }) => {
  const queue = useNotification.use.queue()

  return (
    <>
      {children}

      <div className='pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:p-6'>
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
          {queue.map((item) => (
            <Simple key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Notifications

Notifications.propTypes = {
  children: PropTypes.element.isRequired,
}
