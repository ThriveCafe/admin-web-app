import { arrayMoveImmutable } from 'array-move'
import { API } from 'aws-amplify'
import classNames from 'classnames'
import ms from 'ms'
import {
  assocPath,
  groupBy,
  identity,
  pathOr,
  pipe,
  propOr,
  remove,
  toPairs,
} from 'ramda'
import { useCallback, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import AttachQuiz from '@/app/program/active/components/general/components/attach-quiz'
import Button from '@/components/button'
import FileUploader from '@/components/file-uploader'
import SectionHeader from '@/components/section-header'
import ProgramUploadTypes from '@/config/program-upload-types'
import capitalize from '@/utils/capitalize'
import delay from '@/utils/delay'
import handleApiError from '@/utils/handle-api-error'

import useActiveProgram from '../../../../stores/use-active-program'

const resourceSelector = pathOr([], ['program', 'resource'])
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
const Item = SortableElement(({ item, deleteResource, updateResource }) => {
  return (
    <div className='relative my-4 flex h-36 items-center justify-between bg-gray-200 pr-2'>
      <div
        className={classNames(
          'flex h-full items-center justify-between space-x-2',
          {
            'aspect-[16/9]': ['IMAGE', 'VIDEO'].includes(item.type),
          },
        )}
      >
        {item.type.toUpperCase() === 'IMAGE' ? (
          <>
            <img
              src={item.url}
              alt='Resource Item'
              className='h-[80%] w-full object-contain'
            />
            <p className='pl-1 pr-1'>{ExtractTitle(item.url)}</p>
          </>
        ) : item.type.toUpperCase() === 'VIDEO' ? (
          <>
            <ReactPlayer url={item.url} height='80%' width='100%' controls />
            <p className='pl-1 pr-1'>{ExtractTitle(item.url)}</p>
          </>
        ) : item.type.toUpperCase() === 'QUIZ' ? (
          <p className='pl-1 pr-1'>Quiz: {item.title}</p>
        ) : (
          <p>Document</p>
        )}
      </div>
      <label className='w-[60%] pr-[20px]'>
        <span className='text-xs'>Session</span>
        <select
          className='block w-24 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          value={item.sessionIndex || 1}
          onChange={(e) =>
            updateResource({ ...item, sessionIndex: Number(e.target.value) })
          }
        >
          {Array.from({ length: 10 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={`item${i}`}>{i + 1}</option>
          ))}
        </select>
      </label>
      <Button
        className='mt-2 inline-flex w-full w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={() => deleteResource()}
      >
        Delete
      </Button>
    </div>
  )
})

const ListGroups = ({
  items,
  deleteResource,
  updateResource,
  sortEndHandler,
}) => {
  const itemsWithIndex = items.map((item, index) => ({ ...item, index }))
  const grouped = pipe(
    groupBy(propOr(1, 'sessionIndex')),
    toPairs,
  )(itemsWithIndex)

  return (
    <div>
      {grouped.map(([sessionIndex, sessionItems]) => (
        <div key={sessionIndex}>
          <p className='mt-2 text-lg font-medium'>Session {sessionIndex}</p>
          <div>
            <List
              items={sessionItems}
              onSortEnd={sortEndHandler}
              deleteResource={deleteResource}
              updateResource={updateResource}
            />
          </div>
        </div>
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
}

const List = SortableContainer(({ items, deleteResource, updateResource }) => {
  return (
    <div className=''>
      {items.map((item) => {
        const { index, ...data } = item

        return (
          <Item
            key={data.url}
            index={index}
            item={data}
            deleteResource={() => deleteResource(index)}
            updateResource={(res) => updateResource(index, res)}
          />
        )
      })}
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
    await mutateProgram()
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

  const addQuiz = useCallback(
    async (quizId) => {
      const quiz = await API.get('user', `/quiz/${quizId}`, {}).catch(
        handleApiError,
      )

      if (!quiz) {
        return false
      }

      return updateProgram({
        resource: [
          ...resource,
          {
            type: 'QUIZ',
            url: quiz.id,
            isProtected: true,
            title: quiz.title,
            sessionIndex: 0,
          },
        ],
      })
    },
    [resource, updateProgram],
  )

  const deleteResource = useCallback(
    (index) =>
      updateProgram({
        resource: remove(index, 1, resource),
      }),
    [resource, updateProgram],
  )

  const updateResource = useCallback(
    (index, item) =>
      updateProgram({
        resource: assocPath([index], item, resource),
      }),
    [resource, updateProgram],
  )

  return (
    <div className='my-8'>
      <SectionHeader title='Resources' />

      <ListGroups
        items={resource}
        sortEndHandler={sortEndHandler}
        deleteResource={deleteResource}
        updateResource={updateResource}
      />
      <div className='relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-14' />

      <div className='flex w-full justify-end'>
        <AttachQuiz addQuiz={addQuiz} />
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
        {/* <Button
          type='submit'
          className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setUploadType('document')}
        >
          Add Document
        </Button> */}
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
