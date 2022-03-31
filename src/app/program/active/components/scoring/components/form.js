import { pathOr } from 'ramda'
import { useMemo } from 'react'
import { Model, Survey } from 'survey-react'

import ScoreForm from '@/app/quiz/active/components/scoring/components/score-form'
import { afterRenderQuestionHandler } from '@/app/quiz/active/components/scoring/utils'
import useActiveQuiz from '@/app/quiz/stores/use-active-quiz'

const isScoredSelector = pathOr(false, ['quiz', 'isScored'])
const configSelector = pathOr('', ['quiz', 'config'])

const Form = ({ scores, updateScores }) => {
  const isScored = useActiveQuiz(isScoredSelector)
  const config = useActiveQuiz(configSelector)

  const model = useMemo(() => {
    if (!config) {
      return null
    }

    const surveyModel = new Model(config)
    surveyModel.questionsOnPageMode = 'singlePage'
    surveyModel.mode = 'display'

    return surveyModel
  }, [config])

  return (
    isScored && (
      <div className='prose mx-auto my-8 max-w-3xl shadow'>
        <ScoreForm scores={scores} updateScores={updateScores} />
        <Survey
          model={model}
          onAfterRenderQuestion={afterRenderQuestionHandler(updateScores)}
        />
      </div>
    )
  )
}

export default Form
