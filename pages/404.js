import Link from '@/components/link'

const Custom404 = () => {
  return (
    <div className='flex h-full w-full flex-col bg-white'>
      <main className='mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-shrink-0 justify-center'>
          <Link href='/' className='inline-flex'>
            <span className='sr-only'>Workflow</span>
            <img
              className='h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
              alt=''
            />
          </Link>
        </div>
        <div className='py-16'>
          <div className='text-center'>
            <p className='text-sm font-semibold uppercase tracking-wide text-indigo-600'>
              404 error
            </p>
            <h1 className='mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
              Page not found.
            </h1>
            <p className='mt-2 text-base text-gray-500'>
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-6'>
              <Link
                href='/'
                className='text-base font-medium text-indigo-600 hover:text-indigo-500'
              >
                Go back home<span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Custom404
