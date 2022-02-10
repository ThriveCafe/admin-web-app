import { pathOr } from 'ramda'
import { useState } from 'react'

import Form from '@/app/quiz/active/components/scoring/components/form'
import Header from '@/app/quiz/active/components/scoring/components/header'
import useActiveQuiz from '@/app/quiz/stores/use-active-quiz'

const configSelector = pathOr('', ['quiz', 'config'])
const scoresSelector = pathOr({}, ['quiz', 'scores'])

const Scoring = () => {
  const config = useActiveQuiz(configSelector)
  const quizScores = useActiveQuiz(scoresSelector)
  const [scores, updateScores] = useState(quizScores)

  return !config ? null : (
    <>
      <Header scores={scores} />
      <Form scores={scores} updateScores={updateScores} />
    </>
  )
}

export default Scoring
