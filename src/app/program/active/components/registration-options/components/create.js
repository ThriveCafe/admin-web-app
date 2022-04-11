import { Dialog, Transition } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { identity, propOr } from 'ramda'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { array, number, object, string } from 'yup'

import Button from '@/components/button'
import Input from '@/components/input'
import SchedulePicker from '@/components/schedule-picker'
import SectionHeader from '@/components/section-header'
import useToggle from '@/hooks/use-toggle'

import useActiveProgramRegistrations from '../../../../stores/use-active-program-registrations'

const schema = object({
  type: string().required(),
  title: string().required(),
  price: number().required(),
  schedule: array().required(),
  registrationLimit: number().required(),
}).required()

const createRegistrationOptionsSelector = propOr(
  identity,
  'createRegistrationOptions',
)

const Info = () => {
  const [showCreateModal, toggleCreateModal] = useToggle(false)

  const {
    query: { id },
  } = useRouter()
  const createRegistrationOptions = useActiveProgramRegistrations(
    createRegistrationOptionsSelector,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'MULTIPLE_LIVE',
      title: '',
      price: 999,
      schedule: [],
      registrationLimit: 5,
    },
  })

  const onSubmit = useCallback(
    async (values) => {
      const success = await createRegistrationOptions({ ...values, id })

      if (success) {
        reset()
        toggleCreateModal(false)
      }
    },
    [createRegistrationOptions, id, reset, toggleCreateModal],
  )

  return (
    <div className='my-8 flex w-full justify-end'>
      <Button
        className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={() => toggleCreateModal(true)}
      >
        Create new Registration Option
      </Button>
      <Transition.Root show={showCreateModal} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => toggleCreateModal(false)}
        >
          <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:h-screen sm:align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle md:max-w-3xl'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='inline-block w-full pb-8 align-bottom'
                >
                  <SectionHeader title='Option Details' />
                  <Input
                    className='mb-4 bg-gray-100'
                    name='type'
                    label='Type'
                    type='text'
                    required
                    register={register}
                    errors={errors}
                    disabled
                  />
                  <Input
                    className='mb-4'
                    name='title'
                    label='Title'
                    type='text'
                    required
                    register={register}
                    errors={errors}
                  />

                  <Input
                    className='mb-4'
                    name='price'
                    label='Price'
                    type='number'
                    required
                    register={register}
                    errors={errors}
                    prefix='₹'
                  />

                  <Input
                    className='mb-4'
                    name='registrationLimit'
                    label='Registration Limit'
                    type='number'
                    required
                    register={register}
                    errors={errors}
                  />
                  <SchedulePicker
                    onChange={(value) => setValue('schedule', value)}
                  />
                  <div className='flex w-full justify-end'>
                    <Button
                      type='submit'
                      className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                    >
                      Create Registration Option
                    </Button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default Info
