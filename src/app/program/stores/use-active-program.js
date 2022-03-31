import { API } from 'aws-amplify'

import ProgramApis from '@/app/program/api'
import getFileExtension from '@/utils/get-file-extension'
import handleApiError from '@/utils/handle-api-error'
import createStoreWithContext from '@/utils/store/create-store-with-context'

const { withStore, useStore: useActiveProgram } = createStoreWithContext(
  (set, get, swrFields) => ({
    ...swrFields,
    updateProgram: async ({
      title,
      handle,
      intro,
      description,
      seoTitle,
      seoDescription,
      seoKeywords,
      gallery,
      resource,
    }) => {
      const {
        program: { id },
        mutateProgram,
      } = get()

      await mutateProgram(
        (currentProgram) => ({
          ...currentProgram,
          gallery: gallery || currentProgram.gallery,
          resource: resource || currentProgram.resource,
        }),
        { revalidate: false },
      )

      const program = await ProgramApis.updateProgram({
        id,
        title,
        handle,
        intro,
        description,
        seoTitle,
        seoDescription,
        seoKeywords,
        gallery,
        resource,
      })

      if (program) {
        await mutateProgram()
      }

      return program
    },
    togglePublishProgram: async () => {
      const {
        program: { id, status },
      } = get()

      const program = await API.put('user', '/program', {
        body: { id, status: status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' },
      }).catch(handleApiError)

      if (program) {
        const { mutateProgram } = get()

        await mutateProgram()
      }

      return program
    },
    deleteProgram: async () => {
      const {
        program: { id },
      } = get()

      await ProgramApis.deleteProgram(id)

      // await Router.push('/program')
      // Router.reload()
    },
    getFileUploadUrl: async (type, file) => {
      const {
        program: { id },
      } = get()

      const { type: contentType } = file
      const extension = getFileExtension(file)

      return ProgramApis.getFileUploadUrl({
        type,
        id,
        contentType,
        extension,
      })
    },
  }),
  (data, query) => {
    return {
      key: `active-program-${query?.id}`,
      fetcher: () => ProgramApis.getProgram(query?.id),
      isProtected: true,
      storeKey: 'program',
    }
  },
)

export const withActiveProgramStore = withStore

export default useActiveProgram