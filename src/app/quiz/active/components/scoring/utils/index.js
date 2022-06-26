/* eslint-disable import/prefer-default-export */
import produce from 'immer'

export const afterRenderQuestionHandler =
  (updateScores) => (surveyModel, options) => {
    // eslint-disable-next-line no-param-reassign
    options.question.readOnly = true

    const { htmlElement, question } = options
    updateScores(
      produce((draft) => {
        const data = {
          el: htmlElement,
          name: question?.propertyHash?.name,
          choices:
            question.constructor.name === 'QuestionBooleanModel'
              ? ['yes', 'no']
              : question?.propertyHash?.choices?.map(
                  (choice) => choice.propertyHash.value,
                ),
        }

        if (!draft[data.name]) {
          draft[data.name] = data
        } else {
          draft[data.name] = { ...draft[data.name], ...data }
        }
      }),
    )
  }
