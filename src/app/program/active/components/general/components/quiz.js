import { yupResolver } from '@hookform/resolvers/yup'
import { identity, propOr } from 'ramda'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { number, object, string } from 'yup'

import ProgramApis from '@/app/program/api'
import Button from '@/components/button'
import Input from '@/components/input'
import SectionHeader from '@/components/section-header'
import useSwr from '@/modules/swr/hooks/use-swr'

import useActiveProgram from '../../../../stores/use-active-program'

const schema = object({
  quizId: string().required(),
  sessionIndex: number().required(),
})

const programSelector = propOr(null, 'program')
const addQuizProgramMapSelector = propOr(identity, 'addQuizProgramMap')

const QuizProgramMap = () => {
  const program = useActiveProgram(programSelector)
  const addQuizProgramMap = useActiveProgram(addQuizProgramMapSelector)

  const { data, mutate } = useSwr({
    key: `quiz-program-map-${program?.id}`,
    fetcher: () => ProgramApis.getQuizProgramMap(program?.id),
    initialData: [],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quizId: '',
      sessionIndex: 1,
    },
  })

  const onSubmit = useCallback(
    async ({ quizId, sessionIndex }) => {
      await addQuizProgramMap({
        quizId,
        sessionIndex,
      })
      await mutate()
      reset()
    },
    [addQuizProgramMap, mutate, reset],
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='inline-block w-full pb-8 align-bottom'
    >
      <SectionHeader title='Quizzes' />
      <ol className='mb-4 list-decimal pl-6 text-sm'>
        {data
          .sort((a, b) => a.sessionIndex - b.sessionIndex)
          .map(({ quizId, sessionIndex }) => (
            <li key={quizId}>
              <div className='flex items-center justify-between pl-2'>
                <p className='flex-[3]'>Quiz ID: {quizId}</p>
                <p className='flex-1'>Session: {sessionIndex}</p>
                <Button
                  className='mt-2 inline-flex w-full w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={async () => {
                    await ProgramApis.deleteQuizProgramMap(program?.id, quizId)
                    await mutate()
                  }}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ol>
      <div className='rounded p-2 shadow-lg'>
        <p className='mb-2  font-medium'>Add a quiz:</p>
        <Input
          className='mb-4'
          name='quizId'
          label='Quiz ID'
          type='text'
          required
          register={register}
          errors={errors}
        />
        <Input
          className='mb-4'
          name='sessionIndex'
          label='Session Index'
          type='number'
          required
          register={register}
          errors={errors}
        />

        <div className='flex w-full justify-end'>
          <Button
            type='submit'
            className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  )
}

export default QuizProgramMap
