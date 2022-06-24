import { ChevronRightIcon } from '@heroicons/react/solid'
import { propOr } from 'ramda'

import Create from '@/app/quiz/components/create'
import useAllQuiz, { withAllQuizStore } from '@/app/quiz/stores/use-all-quiz'
import Link from '@/components/link'

const allQuizzesSelector = propOr([], 'quizzes')

const AllItems = () => {
  const quizzes = useAllQuiz(allQuizzesSelector)

  return (
    <div className='flex w-1/3 flex-col overflow-hidden bg-white shadow sm:rounded-md'>
      <div className='flex w-full justify-between p-4 align-middle'>
        <h2 className='font-semibold'>All Quizzes</h2>
        <Create />
      </div>
      <ul className='h-full flex-1 divide-y divide-gray-200 overflow-auto'>
        {quizzes.map(({ id, status, title }) => (
          <li key={id}>
            <Link href={`/quiz/${id}`} className='block hover:bg-gray-50'>
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div className='truncate'>
                    <p className='truncate font-medium text-indigo-600'>
                      {title}
                    </p>
                    <p className='text-sm'>
                      Status: <span className='font-semibold'>{status}</span>
                    </p>
                  </div>
                </div>
                <div className='ml-5 flex-shrink-0'>
                  <ChevronRightIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withAllQuizStore(AllItems)
