import 'survey-react/survey.min.css'

import ms from 'ms'
import { pathOr } from 'ramda'
import { useMemo } from 'react'
import { Model, Survey } from 'survey-react'

import useActiveQuiz from '@/app/quiz/stores/use-active-quiz'
import delay from '@/utils/delay'

const configSelector = pathOr('', ['quiz', 'config'])

const Preview = () => {
  const config = useActiveQuiz(configSelector)

  const model = useMemo(() => (!config ? null : new Model(config)), [config])

  return !model ? null : (
    <div className='prose mx-auto my-8 max-w-3xl shadow'>
      <Survey
        model={model}
        onComplete={async (survey, options) => {
          options.showDataSaving()
          await delay(ms('2s'))
          options.showDataSavingSuccess()
        }}
      />
    </div>
  )
}

export default Preview
