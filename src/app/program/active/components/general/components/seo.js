import { yupResolver } from '@hookform/resolvers/yup'
import ms from 'ms'
import { identity, propOr } from 'ramda'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

import Button from '@/components/button'
import FileUploader from '@/components/file-uploader'
import Input from '@/components/input'
import SectionHeader from '@/components/section-header'
import Textarea from '@/components/textarea'
import ProgramUploadTypes from '@/config/program-upload-types'
import useToggle from '@/hooks/use-toggle'
import delay from '@/utils/delay'

import useActiveProgram from '../../../../stores/use-active-program'

const schema = object({
  title: string().required(),
  handle: string().required(),
  intro: string().required(),
  description: string().required(),
  seoTitle: string().required(),
  seoDescription: string().required(),
  seoKeywords: string().required(),
}).required()

const programSelector = propOr(null, 'program')
const updateProgramSelector = propOr(identity, 'updateProgram')
const getFileUploadUrlSelector = propOr(identity, 'getFileUploadUrl')
const mutateProgramSelector = propOr(identity, 'mutateProgram')

const Seo = () => {
  const program = useActiveProgram(programSelector)
  const updateProgram = useActiveProgram(updateProgramSelector)
  const getFileUploadUrl = useActiveProgram(getFileUploadUrlSelector)
  const mutateProgram = useActiveProgram(mutateProgramSelector)

  const [showSEOImageUploader, toggleSEOImageUploader] = useToggle(false)

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
      seoTitle: program.seo?.title,
      seoDescription: program.seo?.description,
      seoKeywords: program.seo?.keywords,
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

  const waitAndUpdateProfile = useCallback(async () => {
    await delay(ms('3s'))
    await mutateProgram()
    toggleSEOImageUploader(false)
  }, [mutateProgram, toggleSEOImageUploader])

  const getSEOImageUploadUrl = useCallback(
    (file) => getFileUploadUrl(ProgramUploadTypes.SEO_IMAGE.name, file),
    [getFileUploadUrl],
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='inline-block w-full py-8 align-bottom'
    >
      <SectionHeader title='SEO' />
      <Input
        className='mb-4'
        name='seoTitle'
        label='SEO Title'
        type='text'
        required
        register={register}
        errors={errors}
      />
      <Textarea
        name='seoDescription'
        label='SEO Description'
        type='text'
        rows={5}
        required
        register={register}
        errors={errors}
      />
      <Input
        className='mb-4'
        name='seoKeywords'
        label='SEO Keywords'
        type='text'
        required
        register={register}
        errors={errors}
      />

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          SEO Image
        </label>
        <div className='flex items-end'>
          {program.seo.image ? (
            <div className='aspect-w-16 aspect-h-9 mt-1 mr-4 flex h-48 flex-1 items-center justify-center rounded-md'>
              <img
                className='mx-auto  h-full w-full rounded-lg object-cover'
                src={program.seo.image}
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
            onClick={() => toggleSEOImageUploader(true)}
            className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Change
          </Button>
        </div>
      </div>
      <FileUploader
        open={showSEOImageUploader}
        toggleOpen={toggleSEOImageUploader}
        getUploadUrl={getSEOImageUploadUrl}
        onComplete={waitAndUpdateProfile}
        allowedFileTypes={['image/*']}
      />
      <div className='flex w-full justify-end'>
        <Button
          type='submit'
          className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
        >
          Update Program SEO
        </Button>
      </div>
    </form>
  )
}

export default Seo
