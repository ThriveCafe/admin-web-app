import { yupResolver } from '@hookform/resolvers/yup'
import { Auth } from 'aws-amplify'
import { NextSeo } from 'next-seo'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

import Button from '@/components/button'
import Input from '@/components/input'
import Link from '@/components/link'
import getQueryParam from '@/utils/get-query-param'
import handleApiError from '@/utils/handle-api-error'
import protectedRoute from '@/utils/protected-route'

const schema = object({
  email: string().email().required(),
  password: string().min(8).required(),
}).required()

const Login = () => {
  const defaultEmail = getQueryParam('email') || ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail, password: '' },
  })

  const onSubmit = useCallback(
    ({ email, password }) => Auth.signIn(email, password).catch(handleApiError),
    [],
  )

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 2xl:py-48'>
      <NextSeo title='Login' />
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link
            href='/auth/register'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            create a new one
          </Link>
        </p>
      </div>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='email'
              label='Email Address'
              type='email'
              autoComplete='email'
              required
              register={register}
              errors={errors}
            />

            <Input
              name='password'
              type='password'
              label='Password'
              autoComplete='current-password'
              required
              register={register}
              errors={errors}
            />

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <Link
                  href='/auth/forgot-password'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Sign in
              </Button>
            </div>
          </form>

          {/* <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>OR</span>
              </div>
            </div>

            <div className='mt-6 grid'>
              <div>
                <Button className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                  <svg
                    className='w-5 h-5 mr-2'
                    enableBackground='new 0 0 24 24'
                    viewBox='0 0 24 24'
                  >
                    <g>
                      <path
                        d='M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707   C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321   C6.4099731,6.9193726,8.977478,5,12,5z'
                        fill='#F44336'
                      />
                      <path
                        d='M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12   c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458   l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z'
                        fill='#2196F3'
                      />
                      <path
                        d='M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511   C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215   C5.1484375,13.6044312,5,12.8204346,5,12z'
                        fill='#FFC107'
                      />
                      <path
                        d='M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959   C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834   C14.7412109,18.5588989,13.4284058,19,12,19z'
                        fill='#00B060'
                      />
                      <path
                        d='M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24   c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z'
                        opacity='0.1'
                      />
                      <polygon
                        opacity='0.1'
                        points='12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25  '
                      />
                      <path
                        d='M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12   c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z'
                        fill='#E6E6E6'
                      />
                      <path
                        d='M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z'
                        fill='#FFFFFF'
                        opacity='0.2'
                      />
                      <linearGradient
                        gradientUnits='userSpaceOnUse'
                        x1='0'
                        x2='24'
                        y1='12'
                        y2='12'
                      >
                        <stop
                          offset='0'
                          style={{
                            stopColor: '#FFFFFF',
                          }}
                        />
                        <stop
                          offset='1'
                          style={{
                            stopColor: '#FFFFFF',
                          }}
                        />
                      </linearGradient>
                      <path
                        d='M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19   c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686   c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979   C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12   c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12   C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z'
                        fill='url(#SVGID_1_)'
                      />
                      <path
                        d='M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7   c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5   c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374   l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z'
                        opacity='0.1'
                      />
                      <path
                        d='M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122   l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12   c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z'
                        fill='#FFFFFF'
                        opacity='0.2'
                      />
                    </g>
                    <g />
                  </svg>
                  <span>Sign in with Google</span>
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default protectedRoute(Login, { preventLoggedInUsers: true })
