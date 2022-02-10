import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { identity, pathOr } from 'ramda'
import { useCallback } from 'react'

import useActiveQuiz from '@/app/quiz/stores/use-active-quiz'
import Button from '@/components/button'

const isScoredSelector = pathOr(false, ['quiz', 'isScored'])
const updateScoresSelector = pathOr(identity, ['updateQuizScores'])
const updateQuizSelector = pathOr(identity, ['updateQuiz'])

const Header = ({ scores }) => {
  const isScored = useActiveQuiz(isScoredSelector)
  const saveUpdatedScores = useActiveQuiz(updateScoresSelector)
  const updateQuiz = useActiveQuiz(updateQuizSelector)

  const toggleScores = useCallback(
    () => updateQuiz({ isScored: !isScored }),
    [isScored, updateQuiz],
  )

  return (
    <div className='mx-auto my-8 flex w-full max-w-3xl items-center justify-between'>
      <Switch
        checked={isScored}
        onChange={toggleScores}
        className={classNames(
          isScored ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        )}
      >
        <span
          className={classNames(
            isScored ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        >
          <span
            className={classNames(
              isScored
                ? 'opacity-0 duration-100 ease-out'
                : 'opacity-100 duration-200 ease-in',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
          >
            <svg
              className='h-3 w-3 text-gray-400'
              fill='none'
              viewBox='0 0 12 12'
            >
              <path
                d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <span
            className={classNames(
              isScored
                ? 'opacity-100 duration-200 ease-in'
                : 'opacity-0 duration-100 ease-out',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
          >
            <svg
              className='h-3 w-3 text-indigo-600'
              fill='currentColor'
              viewBox='0 0 12 12'
            >
              <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
            </svg>
          </span>
        </span>
      </Switch>
      <p className='ml-4 flex-1 text-lg font-medium'>
        {isScored ? 'Scores Enabled' : 'Enable scores'}
      </p>
      {isScored && (
        <Button
          className='ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => saveUpdatedScores(scores)}
          withConfirmation
        >
          Save Scores
        </Button>
      )}
    </div>
  )
}

export default Header
