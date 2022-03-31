import noSSR from '@/utils/no-ssr'

const ActiveProgramWithoutSSR = noSSR(() => import('@/app/program/active'))

export default ActiveProgramWithoutSSR
