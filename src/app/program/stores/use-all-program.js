import ProgramApis from '@/app/program/api'
import createStoreWithContext from '@/utils/store/create-store-with-context'

const { withStore, useStore: useAllProgram } = createStoreWithContext(
  (set, get, swrFields) => ({
    ...swrFields,
    createProgram: async () => {
      const program = await ProgramApis.createProgram()

      if (program) {
        const { mutatePrograms } = get()

        await mutatePrograms()
      }

      return program
    },
  }),
  () => ({
    key: `all-program`,
    fetcher: ProgramApis.getAllPrograms,
    isProtected: true,
    storeKey: 'programs',
  }),
)

export const withAllProgramStore = withStore

export default useAllProgram
