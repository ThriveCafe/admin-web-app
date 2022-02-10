import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'

const getIcon = (type) =>
  type === 'success' ? (
    <CheckCircleIcon className='h-6 w-6 text-green-400' aria-hidden='true' />
  ) : type === 'warning' ? (
    <ExclamationCircleIcon
      className='h-6 w-6 text-orange-400'
      aria-hidden='true'
    />
  ) : type === 'error' ? (
    <XCircleIcon className='h-6 w-6 text-red-400' aria-hidden='true' />
  ) : (
    <BellIcon className='h-6 w-6 text-blue-400' aria-hidden='true' />
  )

export default getIcon
