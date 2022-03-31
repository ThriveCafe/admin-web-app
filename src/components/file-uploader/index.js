import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/status-bar/dist/style.css'

import { Dialog, Transition } from '@headlessui/react'
import AwsS3 from '@uppy/aws-s3'
import Uppy from '@uppy/core'
import { DragDrop, StatusBar } from '@uppy/react'
import PropTypes from 'prop-types'
import { Fragment, useEffect, useMemo, useState } from 'react'

import useToggle from '@/hooks/use-toggle'
import useNotification from '@/modules/notifications/stores/use-notification'

const FileUploader = ({
  open,
  toggleOpen,
  getUploadUrl,
  onComplete,
  allowedFileTypes,
  title,
  instructions,
}) => {
  const addNotification = useNotification.use.addNotification()

  const [picked, setPicked] = useState(null)
  const [loading, toggleLoading] = useToggle(false)

  useEffect(() => {
    setPicked(null)
    toggleLoading(false)
  }, [toggleLoading])

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: { maxNumberOfFiles: 1, allowedFileTypes },
      autoProceed: true,
      onBeforeFileAdded: (currentFile) => {
        setPicked(URL.createObjectURL(currentFile.data))
        return true
      },
    })
      .use(AwsS3, {
        async getUploadParameters(file) {
          const url = await getUploadUrl(file)

          if (url) {
            return {
              method: 'PUT',
              url,
            }
          }

          return false
        },
      })
      .on('complete', async (result) => {
        toggleLoading(true)
        if (result?.failed?.length) {
          addNotification('error', 'Failed to upload.')
        } else {
          addNotification('success', 'Uploaded successfully!')
          await onComplete(result?.successful[0])
        }
        setPicked(false)
        toggleLoading(false)
      })
  }, [
    addNotification,
    allowedFileTypes,
    getUploadUrl,
    onComplete,
    toggleLoading,
  ])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={() => toggleOpen(false)}
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
            <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:px-6 sm:pt-2 sm:pb-6 sm:align-middle'>
              <div>
                <div className='text-center sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title || 'Select a file'}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{instructions}</p>
                  </div>

                  {loading ? (
                    <div className='flex h-40 w-full items-center justify-center'>
                      <svg
                        className='-ml-1 mr-3 h-8 w-8 animate-spin text-gray-600'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className='my-4 mx-auto w-full'>
                      {!picked && (
                        <div className='aspect-w-16 aspect-h-7'>
                          <DragDrop
                            locale={{
                              strings: {
                                dropHereOr: 'Drop files here or %{browse}',
                                browse: 'browse',
                              },
                            }}
                            style={{ width: '100%', height: '100%' }}
                            uppy={uppy}
                          />
                        </div>
                      )}

                      <div className='mt-4'>
                        <StatusBar
                          hideAfterFinish
                          showProgressDetails
                          uppy={uppy}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FileUploader

FileUploader.propTypes = {
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  getUploadUrl: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
}
