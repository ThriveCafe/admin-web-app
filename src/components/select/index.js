import { ExclamationCircleIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { pathOr } from 'ramda'

import capitalize from '@/utils/capitalize'

const Select = ({
  register,
  errors,
  name,
  label,
  className,
  children,
  ...props
}) => {
  const error = pathOr('', [name, 'message'])(errors)

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        {label}
        <div className='relative mt-1 rounded-md shadow-sm'>
          <select
            name={name}
            {...props}
            className={classNames(
              `block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`,
              error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : '',
              className,
            )}
            {...register(name)}
          >
            {children}
          </select>
          {Boolean(error) && (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
      </label>
      <p className='mt-2 text-sm text-red-600'>{capitalize(error)}</p>
    </div>
  )
}

export default Select
