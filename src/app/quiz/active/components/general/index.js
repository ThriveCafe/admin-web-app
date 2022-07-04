import { yupResolver } from '@hookform/resolvers/yup'
import { identity, propOr } from 'ramda'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

import useActiveQuiz from '@/app/quiz/stores/use-active-quiz'
import Button from '@/components/button'
import Input from '@/components/input'
import Textarea from '@/components/textarea'

const schema = object({
  title: string().required(),
  config: string().required(),
}).required()

const quizSelector = propOr(null, 'quiz')
const updateQuizSelector = propOr(identity, 'updateQuiz')

const General = () => {
  const quiz = useActiveQuiz(quizSelector)
  const updateQuiz = useActiveQuiz(updateQuizSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: quiz.title, config: quiz.config },
  })

  const onSubmit = useCallback(
    async ({ title, config }) => updateQuiz({ title, config }),
    [updateQuiz],
  )

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='inline-block w-full py-8 align-bottom'
      >
        <Input
          className='mb-4'
          label='ID'
          value={quiz.id}
          type='text'
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
        <Textarea
          name='config'
          label='Config'
          type='text'
          rows={15}
          required
          register={register}
          errors={errors}
        />
        <div className='flex w-full justify-end'>
          <Button
            type='submit'
            className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          >
            Update Quiz
          </Button>
        </div>
      </form>
    </div>
  )
}

export default General
