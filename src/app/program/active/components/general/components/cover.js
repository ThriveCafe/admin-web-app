import ms from 'ms'
import { identity, pathOr, propOr } from 'ramda'
import { useCallback } from 'react'
import ReactPlayer from 'react-player/lazy'

import useActiveProgram from '@/app/program/stores/use-active-program'
import Button from '@/components/button'
import FileUploader from '@/components/file-uploader'
import SectionHeader from '@/components/section-header'
import ProgramUploadTypes from '@/config/program-upload-types'
import useToggle from '@/hooks/use-toggle'
import delay from '@/utils/delay'

const coverSelector = pathOr({}, ['program', 'cover'])
const mutateProgramSelector = propOr(identity, 'mutateProgram')
const getFileUploadUrlSelector = propOr(identity, 'getFileUploadUrl')

const Cover = () => {
  const cover = useActiveProgram(coverSelector)
  const mutateProgram = useActiveProgram(mutateProgramSelector)
  const getFileUploadUrl = useActiveProgram(getFileUploadUrlSelector)

  const [showCoverImageUploader, toggleCoverImageUploader] = useToggle(false)
  const [showCoverVideoUploader, toggleCoverVideoUploader] = useToggle(false)

  const waitAndUpdateProfile = useCallback(async () => {
    await delay(ms('3s'))
    await mutateProgram()
    toggleCoverImageUploader(false)
    toggleCoverVideoUploader(false)
  }, [mutateProgram, toggleCoverImageUploader, toggleCoverVideoUploader])

  const getCoverImageUploadUrl = useCallback(
    (file) => getFileUploadUrl(ProgramUploadTypes.COVER_IMAGE.name, file),
    [getFileUploadUrl],
  )
  const getCoverVideoUploadUrl = useCallback(
    (file) => getFileUploadUrl(ProgramUploadTypes.COVER_VIDEO.name, file),
    [getFileUploadUrl],
  )

  return (
    <div className='my-8'>
      <SectionHeader title='Cover' />

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Cover photo
        </label>
        <div className='flex items-end'>
          {cover.image ? (
            <div className='aspect-w-16 aspect-h-9 mt-1 mr-4 flex h-48 flex-1 items-center justify-center rounded-md'>
              <img
                className='mx-auto  h-full w-full rounded-lg object-cover'
                src={cover.image}
                alt=''
              />
            </div>
          ) : (
            <div className='mt-1 mr-4 flex h-48 flex-1 items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
              <div className='relative flex h-full w-full items-center justify-center space-y-1 text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          )}

          <Button
            type='button'
            onClick={() => toggleCoverImageUploader(true)}
            className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Change
          </Button>
        </div>
      </div>
      <div className='mt-8'>
        <label className='block text-sm font-medium text-gray-700'>
          Cover Video
        </label>
        <div className='flex items-end'>
          {cover.video ? (
            <div className='aspect-w-16 aspect-h-9 mt-1 mr-4 flex h-48 flex-1 items-center justify-center rounded-md'>
              <ReactPlayer
                url={cover.video}
                height='100%'
                width='100%'
                controls
              />
            </div>
          ) : (
            <div className='mt-1 mr-4 flex h-48 flex-1 items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
              <div className='relative flex h-full w-full items-center justify-center space-y-1 text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          )}

          <Button
            type='button'
            onClick={() => toggleCoverVideoUploader(true)}
            className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Change
          </Button>
        </div>
      </div>
      <FileUploader
        open={showCoverImageUploader}
        toggleOpen={toggleCoverImageUploader}
        getUploadUrl={getCoverImageUploadUrl}
        onComplete={waitAndUpdateProfile}
        allowedFileTypes={['image/*']}
        title='Cover Image Upload'
        instructions='Select a high resolution image file to be set as the cover image for the program.'
      />
      <FileUploader
        open={showCoverVideoUploader}
        toggleOpen={toggleCoverVideoUploader}
        getUploadUrl={getCoverVideoUploadUrl}
        onComplete={waitAndUpdateProfile}
        allowedFileTypes={['video/*']}
        title='Cover Video Upload'
        instructions='Select a video to be set as the cover video for the program.'
      />
    </div>
  )
}

export default Cover
