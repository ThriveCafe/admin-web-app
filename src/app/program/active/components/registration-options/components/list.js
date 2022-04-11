import {
  CalendarIcon,
  TrashIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { identity, pathOr } from 'ramda'

import Button from '@/components/button'

import useActiveProgramRegistrations from '../../../../stores/use-active-program-registrations'

const registrationOptionsSelector = pathOr([], ['registrationOptions'])
const deleteRegistrationOptionSelector = pathOr(identity, [
  'deleteRegistrationOption',
])

const List = () => {
  const {
    query: { id },
  } = useRouter()

  const registrationOptions = useActiveProgramRegistrations(
    registrationOptionsSelector,
  )
  const deleteRegistrationOption = useActiveProgramRegistrations(
    deleteRegistrationOptionSelector,
  )

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-md'>
      <ul className='divide-y divide-gray-200'>
        {registrationOptions.map((option) => (
          <li key={option.id}>
            <div className='px-8 py-4 sm:px-6'>
              <div className='flex items-center justify-between'>
                <p className='truncate text-sm font-medium text-indigo-600'>
                  {option.title}
                </p>
                <div className='ml-2 flex flex-shrink-0'>
                  <Button
                    className='inline-flex items-center border border-transparent font-medium text-red-500'
                    withConfirmation
                    confirmationMessage='This action cannot be undone. Are you sure you want to delete the option?'
                    onClick={() =>
                      deleteRegistrationOption(
                        id,
                        option.sk.replace('OPTION#', ''),
                      )
                    }
                  >
                    <TrashIcon className='h-4 w-4' />
                  </Button>
                </div>
              </div>
              <div className='mt-2 sm:flex sm:justify-between'>
                <div className='sm:flex'>
                  <p className='flex items-center text-sm font-medium text-gray-500'>
                    <UsersIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                      aria-hidden='true'
                    />
                    {option.registrationLimit} Registration Limit
                  </p>
                  <p className='mt-2 flex items-center text-sm font-medium text-gray-500 sm:mt-0 sm:ml-6'>
                    <VideoCameraIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                      aria-hidden='true'
                    />
                    {option.schedule.length} Live Sessions
                  </p>
                </div>
                <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                  <CalendarIcon
                    className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                    aria-hidden='true'
                  />
                  <p>
                    First Session on{' '}
                    {DateTime.fromISO(option.schedule[0]?.startTime).toFormat(
                      'hh:mm a, dd MMM yyyy',
                    )}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
