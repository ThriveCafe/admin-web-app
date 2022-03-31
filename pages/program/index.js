import noSSR from '@/utils/no-ssr'

const ProgramWithoutSSR = noSSR(() => import('@/app/program/listing'))

export default ProgramWithoutSSR
