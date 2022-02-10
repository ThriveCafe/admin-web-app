import noSSR from '@/utils/no-ssr'

const QuizWithoutSSR = noSSR(() => import('@/app/quiz/listing'))

export default QuizWithoutSSR
