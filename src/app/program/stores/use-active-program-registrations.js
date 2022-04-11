import ProgramApis from '@/app/program/api'
import createStoreWithContext from '@/utils/store/create-store-with-context'

const { withStore, useStore: useActiveProgramRegistrations } =
  createStoreWithContext(
    (set, get, swrFields) => ({
      ...swrFields,
      createRegistrationOptions: async ({
        id,
        type,
        title,
        price,
        schedule,
        registrationLimit,
      }) => {
        const { mutateRegistrationOptions } = get()

        const success = await ProgramApis.createProgramRegistrationOption({
          id,
          type,
          title,
          price,
          schedule,
          registrationLimit,
        })

        await mutateRegistrationOptions()

        return Boolean(success)
      },
      deleteRegistrationOption: async (id, optionId) => {
        const { mutateRegistrationOptions } = get()

        await ProgramApis.deleteProgramRegistrationOption({
          id,
          optionId,
        })

        await mutateRegistrationOptions()
      },
    }),
    (data, query) => {
      return {
        key: `active-program-${query?.id}-registration-options`,
        fetcher: () => ProgramApis.getProgramRegistrations(query?.id),
        isProtected: true,
        storeKey: 'registrationOptions',
      }
    },
  )

export const withActiveProgramRegistrationsStore = withStore

export default useActiveProgramRegistrations
