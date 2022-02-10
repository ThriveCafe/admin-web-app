import { ExclamationIcon } from '@heroicons/react/solid'

import Button from '@/components/button'
import Link from '@/components/link'

const Fallback = ({ resetErrorBoundary }) => {
  return (
    <div className='min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='mx-auto max-w-max'>
        <main className='sm:flex'>
          <ExclamationIcon className='h-24 w-24 text-red-400' />
          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <h1 className='mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
                Uh-oh, Something went wrong!
              </h1>
              <p className='text-base text-gray-500'>
                Our developers have been notified of the error, and are on it.
              </p>
              <p className='text-base text-gray-500'>
                You can try again or reach out to our support and we'll make
                sure to get you to your goal.
              </p>
            </div>
            <div className='mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <Button
                onClick={resetErrorBoundary}
                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Try Again
              </Button>
              <Link
                href='/support'
                className='inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Contact support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Fallback
