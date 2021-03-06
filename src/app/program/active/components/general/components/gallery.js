import { arrayMoveImmutable } from 'array-move'
import ms from 'ms'
import { identity, pathOr, propOr, remove } from 'ramda'
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

const gallerySelector = pathOr([], ['program', 'gallery'])
const getFileUploadUrlSelector = propOr(identity, 'getFileUploadUrl')
const mutateProgramSelector = propOr(identity, 'mutateProgram')
const updateProgramSelector = propOr(identity, 'updateProgram')
const ExtractTitle = (string) => {
  if (string.includes('EXT')) {
    const title = string.split('EXT')
    return title[1]
  }

  return ''
}
const Item = SortableElement(({ item, deleteResource }) => {
  return (
    <div className='relative my-4 h-36'>
      <div className='flex items-center justify-between'>
        <div className='aspect-[16/9] h-full w-full max-w-[245px]'>
          {item.type === 'IMAGE' ? (
            <>
              <img
                src={item.url}
                alt='Gallery Item'
                className='h-full w-full object-cover'
              />
              <p className='pl-2'>{ExtractTitle(item.url)}</p>
            </>
          ) : (
            <>
              <ReactPlayer url={item.url} height='100%' width='100%' controls />
              <p className='pl-2'>{ExtractTitle(item.url)}</p>
            </>
          )}
        </div>
        <Button
          className='mt-2 mr-2 inline-flex w-full w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => deleteResource()}
        >
          Delete
        </Button>
      </div>
    </div>
  )
})

const List = SortableContainer(({ items, deleteResource }) => {
  return (
    <div className='h-96 overflow-auto'>
      {items.map((item, index) => (
        <Item
          key={item.url}
          index={index}
          item={item}
          deleteResource={() => deleteResource(index)}
        />
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

const Gallery = () => {
  const [uploadType, setUploadType] = useState('')
  const gallery = useActiveProgram(gallerySelector)
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
          ? ProgramUploadTypes.GALLERY_IMAGE.name
          : ProgramUploadTypes.GALLERY_VIDEO.name,
        file,
      ),
    [getFileUploadUrl, uploadType],
  )

  const deleteResource = useCallback(
    (index) =>
      updateProgram({
        gallery: remove(index, 1, gallery),
      }),
    [gallery, updateProgram],
  )

  const sortEndHandler = useCallback(
    ({ oldIndex, newIndex }) =>
      updateProgram({
        gallery: arrayMoveImmutable(gallery, oldIndex, newIndex),
      }),
    [gallery, updateProgram],
  )

  return (
    <div className='my-8'>
      <SectionHeader title='Gallery' />

      <List
        items={gallery}
        onSortEnd={sortEndHandler}
        deleteResource={deleteResource}
      />

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
      </div>
      <FileUploader
        open={Boolean(uploadType)}
        toggleOpen={setUploadType}
        getUploadUrl={getUploadUrl}
        onComplete={waitAndUpdateProfile}
        allowedFileTypes={uploadType === 'image' ? ['image/*'] : ['video/*']}
        title={`Gallery ${capitalize(uploadType || '')} Upload`}
        instructions='Select a file to be added to the gallery of the program.'
      />
    </div>
  )
}

export default Gallery
