import classNames from 'classnames'
import { identity, propOr } from 'ramda'
import { useState } from 'react'

import General from '@/app/quiz/active/components/general'
import Preview from '@/app/quiz/active/components/preview'
import Responses from '@/app/quiz/active/components/responses'
import Scoring from '@/app/quiz/active/components/scoring'
import AllItems from '@/app/quiz/components/all-items'
import useActiveQuiz, {
  withActiveQuizStore,
} from '@/app/quiz/stores/use-active-quiz'
import Button from '@/components/button'
import protectedRoute from '@/utils/protected-route'

const tabs = [
  { name: 'General', component: <General /> },
  { name: 'Scoring', component: <Scoring /> },
  { name: 'Preview', component: <Preview /> },
  { name: 'Responses', component: <Responses /> },
]

const quizSelector = propOr(null, 'quiz')
const togglePublishQuizSelector = propOr(identity, 'togglePublishQuiz')
const deleteQuizSelector = propOr(identity, 'deleteQuiz')

const ActiveQuiz = () => {
  const quiz = useActiveQuiz(quizSelector)
  const togglePublishQuiz = useActiveQuiz(togglePublishQuizSelector)
  const deleteQuiz = useActiveQuiz(deleteQuizSelector)

  const [activeTab, setActiveTab] = useState(0)

  return !quiz ? null : (
    <div className='flex h-full w-full overflow-auto' key={quiz?.id}>
      <AllItems />
      <div className='relative flex h-full w-2/3 flex-col border-b border-gray-200 p-4'>
        <div className='md:flex md:items-center md:justify-between'>
          <h3 className='mr-8 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium leading-6 text-gray-900'>
            {quiz?.title}
          </h3>
          <div className='mt-3 flex md:mt-0'>
            <Button
              className='ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              withConfirmation
              onClick={() => deleteQuiz()}
            >
              Delete
            </Button>
            <Button
              className='ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              withConfirmation
              onClick={() => togglePublishQuiz()}
            >
              {quiz?.status === 'DRAFT' ? 'Publish' : 'Un-publish'}
            </Button>
          </div>
        </div>
        <div className='mt-4'>
          <div className='sm:hidden'>
            <label htmlFor='current-tab' className='sr-only'>
              Select a tab
            </label>
            <select
              id='current-tab'
              name='current-tab'
              className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              defaultValue={tabs[activeTab].name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <nav className='-mb-px flex space-x-8'>
              {tabs.map((tab, index) => (
                <Button
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={classNames(
                    activeTab === index
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 pb-1 text-sm font-medium',
                  )}
                >
                  {tab.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>
        <div className='relative block h-full w-full flex-1 overflow-auto'>
          {!quiz ? null : tabs[activeTab].component}
        </div>
      </div>
    </div>
  )
}

export default protectedRoute(withActiveQuizStore(ActiveQuiz))
