import { yupResolver } from '@hookform/resolvers/yup'
import { identity, propOr } from 'ramda'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

import Button from '@/components/button'
import Input from '@/components/input'
import SectionHeader from '@/components/section-header'
import Textarea from '@/components/textarea'

import useActiveProgram from '../../../../stores/use-active-program'

const schema = object({
  title: string().required(),
  handle: string().required(),
  intro: string().required(),
  description: string().required(),
}).required()

const programSelector = propOr(null, 'program')
const updateProgramSelector = propOr(identity, 'updateProgram')

const Info = () => {
  const program = useActiveProgram(programSelector)
  const updateProgram = useActiveProgram(updateProgramSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: program.title,
      handle: program.handle,
      intro: program.intro,
      description: program.description,
    },
  })

  const onSubmit = useCallback(
    async ({
      title,
      handle,
      intro,
      description,
      seoTitle,
      seoDescription,
      seoKeywords,
    }) =>
      updateProgram({
        title,
        handle,
        intro,
        description,
        seoTitle,
        seoDescription,
        seoKeywords,
      }),
    [updateProgram],
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='inline-block w-full pb-8 align-bottom'
    >
      <SectionHeader title='Info' />
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
        name='handle'
        label='Handle'
        type='text'
        required
        register={register}
        errors={errors}
      />
      <Textarea
        name='intro'
        label='Short Introduction'
        type='text'
        rows={7}
        register={register}
        errors={errors}
      />
      <Textarea
        name='description'
        label='Description'
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
          Update Program Info
        </Button>
      </div>
    </form>
  )
}

export default Info
