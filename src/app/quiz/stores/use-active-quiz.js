import { API } from 'aws-amplify'
import Router from 'next/router'
import { applySpec, map, propOr } from 'ramda'

import handleApiError from '@/utils/handle-api-error'
import createStoreWithContext from '@/utils/store/create-store-with-context'

const { withStore, useStore: useActiveQuiz } = createStoreWithContext(
  (set, get, swrFields) => ({
    ...swrFields,
    updateQuiz: async ({ title, config, isScored }) => {
      const {
        quiz: { id },
      } = get()

      const quiz = await API.put('user', '/quiz', {
        body: { id, title, config, isScored },
      }).catch(handleApiError)

      if (quiz) {
        const { mutateQuiz } = get()

        await mutateQuiz()
      }

      return quiz
    },
    updateQuizScores: async (scores) => {
      const {
        quiz: { id },
      } = get()

      const data = map(
        applySpec({
          name: propOr('', 'name'),
          scores: propOr({}, 'scores'),
        }),
      )(scores)

      const quiz = await API.put('user', '/quiz', {
        body: { id, scores: data },
      }).catch(handleApiError)

      if (quiz) {
        const { mutateQuiz } = get()

        await mutateQuiz()
      }

      return quiz
    },
    togglePublishQuiz: async () => {
      const {
        quiz: { id, status },
      } = get()

      const quiz = await API.put('user', '/quiz', {
        body: { id, status: status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' },
      }).catch(handleApiError)

      if (quiz) {
        const { mutateQuiz } = get()

        await mutateQuiz()
      }

      return quiz
    },
    deleteQuiz: async () => {
      const {
        quiz: { id },
      } = get()

      await API.del('user', `/quiz?id=${id}`, {}).catch(handleApiError)

      await Router.push('/quiz')
      Router.reload()
    },
  }),
  (data, query) => {
    return {
      key: `active-quiz-${query?.id}`,
      fetcher: () =>
        API.get('user', `/quiz/${query?.id}`).catch(handleApiError),
      isProtected: true,
      storeKey: 'quiz',
    }
  },
)

export const withActiveQuizStore = withStore

export default useActiveQuiz
