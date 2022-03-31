import { arrayMoveImmutable } from 'array-move'
import ms from 'ms'
import { identity, pathOr, propOr } from 'ramda'
import { useCallback, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Button from '@/components/button'
import FileUploader from '@/components/file-uploader'
import SectionHeader from '@/components/section-header'
import ProgramUploadTypes from '@/config/program-upload-types'
import capitalize from '@/utils/capitalize'
import delay from '@/utils/delay'

import useActiveProgram from '../../../../stores/use-active-program'

const resourceSelector = pathOr([], ['program', 'resource'])
const getFileUploadUrlSelector = propOr(identity, 'getFileUploadUrl')
const mutateProgramSelector = propOr(identity, 'mutateProgram')
const updateProgramSelector = propOr(identity, 'updateProgram')

const Item = SortableElement(({ item }) => {
  return (
    <div className='mx-4 inline-block w-96'>
      <div className='aspect-w-16 aspect-h-9'>
        {item.type === 'IMAGE' ? (
          <img
            src={item.url}
            alt='Resource Item'
            className='h-full w-full object-cover'
          />
        ) : item.type === 'VIDEO' ? (
          <ReactPlayer url={item.url} height='100%' width='100%' controls />
        ) : (
          <p>Document</p>
        )}
      </div>
    </div>
  )
})

const List = SortableContainer(({ items }) => {
  return (
    <div className='overflow-x-auto whitespace-nowrap'>
      {items.map((item, index) => (
        <Item key={item.url} index={index} item={item} />
      ))}
      {!items.length && (
        <div className='w-96 shrink-0 first:ml-8 last:mr-8'>
          <div className='aspect-w-16 aspect-h-9 '>
            <p className='flex items-center '>No Items</p>
          </div>
        </div>
      )}
    </div>
  )
})

const Resources = () => {
  const [uploadType, setUploadType] = useState('')
  const resource = useActiveProgram(resourceSelector)
  const getFileUploadUrl = useActiveProgram(getFileUploadUrlSelector)
  const mutateProgram = useActiveProgram(mutateProgramSelector)
  const updateProgram = useActiveProgram(updateProgramSelector)

  const waitAndUpdateProfile = useCallback(async () => {
    await delay(ms('3s'))
    await mutateProgram()
    setUploadType(false)
  }, [mutateProgram, setUploadType])

  const getUploadUrl = useCallback(
    (file) =>
      getFileUploadUrl(
        uploadType === 'image'
          ? ProgramUploadTypes.RESOURCE_IMAGE.name
          : uploadType === 'video'
          ? ProgramUploadTypes.RESOURCE_VIDEO.name
          : ProgramUploadTypes.RESOURCE_DOCUMENT.name,
        file,
      ),
    [getFileUploadUrl, uploadType],
  )

  const sortEndHandler = useCallback(
    ({ oldIndex, newIndex }) =>
      updateProgram({
        resource: arrayMoveImmutable(resource, oldIndex, newIndex),
      }),
    [resource, updateProgram],
  )

  return (
    <div className='my-8'>
      <SectionHeader title='Resources' />

      <List items={resource} onSortEnd={sortEndHandler} axis='x' />
      <div className='relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-14' />

      <div className='flex w-full justify-end'>
        <Button
          type='submit'
          className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setUploadType('image')}
        >
          Add Image
        </Button>
        <Button
          type='submit'
          className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setUploadType('video')}
        >
          Add Video
        </Button>
        <Button
          type='submit'
          className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setUploadType('document')}
        >
          Add Document
        </Button>
      </div>
      <FileUploader
        open={Boolean(uploadType)}
        toggleOpen={setUploadType}
        getUploadUrl={getUploadUrl}
        onComplete={waitAndUpdateProfile}
        allowedFileTypes={
          uploadType === 'image'
            ? ['image/*']
            : uploadType === 'video'
            ? ['video/*']
            : [
                'application/pdf',
                'text/plain',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              ]
        }
        title={`${capitalize(uploadType || '')} Upload`}
        instructions='Select a file to be added to the resources of the program.'
      />
    </div>
  )
}

export default Resources
