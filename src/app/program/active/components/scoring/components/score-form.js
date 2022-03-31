import produce from 'immer'
import { assocPath, pathOr } from 'ramda'
import { Portal } from 'react-portal'

import Input from '@/components/input'

const ScoreForm = ({ scores, updateScores }) => {
  return Object.values(scores).map((question) =>
    !question?.el ? null : (
      <Portal key={`question-${question.name}`} node={question.el}>
        {question?.choices?.length ? (
          <div className='not-prose mt-4 rounded bg-indigo-100 p-4 shadow'>
            <p className='font-medium text-gray-800'>Scores: </p>
            {question.choices.map((choice) => (
              <div
                key={choice}
                className='mb-2 flex w-full items-center justify-start'
              >
                <p className='mr-2'>{choice}:</p>
                <Input
                  type='number'
                  value={Number(
                    pathOr(0, [question.name, 'scores', choice])(scores),
                  )}
                  onChange={(e) => {
                    const value = Number(e.target.value)

                    updateScores(
                      produce((draft) => {
                        draft[question.name] = assocPath(
                          ['scores', choice],
                          value,
                          draft[question.name],
                        )
                      }),
                    )
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='not-prose mt-4 rounded bg-indigo-100 p-4 shadow'>
            <Input
              label='Score'
              type='number'
              value={Number(question.scores) || 0}
              onChange={(e) => {
                const value = Number(e.target.value)

                updateScores(
                  produce((draft) => {
                    draft[question.name].scores = value
                  }),
                )
              }}
            />
          </div>
        )}
      </Portal>
    ),
  )
}

export default ScoreForm
