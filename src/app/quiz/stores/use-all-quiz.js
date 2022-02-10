import { API } from 'aws-amplify'

import handleApiError from '@/utils/handle-api-error'
import createStoreWithContext from '@/utils/store/create-store-with-context'

const { withStore, useStore: useAllQuiz } = createStoreWithContext(
  (set, get, swrFields) => ({
    ...swrFields,
    createQuiz: async ({ title, config }) => {
      const quiz = await API.post('user', '/quiz', {
        body: { title, config },
      }).catch(handleApiError)

      if (quiz) {
        const { mutateQuizzes } = get()

        await mutateQuizzes()
      }

      return quiz
    },
  }),
  () => ({
    key: `all-quiz`,
    fetcher: () => API.get('user', '/quiz').catch(handleApiError),
    isProtected: true,
    storeKey: 'quizzes',
  }),
)

export const withAllQuizStore = withStore

export default useAllQuiz
