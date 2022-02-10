/* This example requires Tailwind CSS v2.0+ */
import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import { Fragment, useEffect } from 'react'

import Button from '@/components/button'
import { NOTIFICATION_TYPES } from '@/config/notifications'
import useToggle from '@/hooks/use-toggle'

import useNotification from '../stores/use-notification'
import getIcon from '../utils/get-icon'

const Simple = ({ data }) => {
  const [show, toggleShow] = useToggle(false)
  const clearNotification = useNotification.use.clearNotification()

  useEffect(() => {
    toggleShow(true)
  }, [toggleShow])

  return (
    <Transition
      show={show}
      as={Fragment}
      enter='transform ease-out duration-300 transition'
      enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
      enterTo='translate-y-0 opacity-100 sm:translate-x-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
        <div className='p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>{getIcon(data.type)}</div>
            <div className='ml-3 w-0 flex-1 pt-0.5'>
              <p className='text-sm font-medium text-gray-900'>{data.title}</p>
              <p className='mt-1 text-sm text-gray-500'>{data.text}</p>
            </div>
            <div className='ml-4 flex flex-shrink-0'>
              <Button
                className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={() => {
                  toggleShow(false)
                  setTimeout(() => {
                    clearNotification(data.id)
                  }, 150)
                }}
              >
                <span className='sr-only'>Close</span>
                <XIcon className='h-5 w-5' aria-hidden='true' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Simple

Simple.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(NOTIFICATION_TYPES).isRequired,
  }).isRequired,
}
