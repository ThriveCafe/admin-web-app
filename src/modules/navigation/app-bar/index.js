import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Auth } from 'aws-amplify'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

import Button from '@/components/button'
import Link from '@/components/link'
import AppBarLinks from '@/config/app-bar-links'

import useAuth from '../../user/stores/use-auth'

const AppBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useRouter()
  const currentUser = useAuth.use.current()

  return !currentUser ? null : (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex justify-end lg:hidden'
          onClose={setSidebarOpen}
        >
          <div className='w-14 flex-shrink-0' aria-hidden='true'>
            {/* Force sidebar to shrink to fit close icon */}
          </div>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div className='relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 left-0 -ml-16 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
                <div className='flex flex-shrink-0 items-center px-4'>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg'
                    alt='Workflow'
                  />
                </div>
                <nav aria-label='Sidebar' className='mt-5'>
                  <div className='space-y-1 px-2'>
                    {AppBarLinks.map(({ name, route, icon: Icon }) => (
                      <Link
                        key={name}
                        href={route}
                        className={classNames(
                          pathname.startsWith(route)
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                        )}
                      >
                        <Icon
                          className={classNames(
                            pathname.startsWith(route)
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 h-6 w-6',
                          )}
                          aria-hidden='true'
                        />
                        {name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
                <div className='group block flex-shrink-0'>
                  <div className='flex items-center'>
                    <div className='ml-3'>
                      <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
                        Admin User
                      </p>
                      <Button
                        onClick={() => Auth.signOut()}
                        className='text-sm font-medium text-gray-500 group-hover:text-gray-700'
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex w-64 flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100'>
            <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
              <div className='flex flex-shrink-0 items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg'
                  alt='Workflow'
                />
              </div>
              <nav className='mt-5 flex-1' aria-label='Sidebar'>
                <div className='space-y-1 px-2'>
                  {AppBarLinks.map(({ name, route, icon: Icon }) => (
                    <Link
                      key={name}
                      href={route}
                      className={classNames(
                        pathname.startsWith(route)
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                      )}
                    >
                      <Icon
                        className={classNames(
                          pathname.startsWith(route)
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 h-6 w-6',
                        )}
                        aria-hidden='true'
                      />
                      {name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
            <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
              <div className='group block w-full flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                      Admin User
                    </p>
                    <Button
                      onClick={() => Auth.signOut()}
                      className='text-sm font-medium text-gray-500 group-hover:text-gray-700'
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex min-w-0 flex-1 flex-col overflow-hidden lg:hidden'>
        <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5'>
          <div>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
          </div>
          <div>
            <button
              type='button'
              className='-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppBar
