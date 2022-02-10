import noSSR from '@/utils/no-ssr'

const ActiveQuizWithoutSSR = noSSR(() => import('@/app/quiz/active'))

export default ActiveQuizWithoutSSR
