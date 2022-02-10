import AllItems from '@/app/quiz/components/all-items'
import protectedRoute from '@/utils/protected-route'

const Quiz = () => {
  return (
    <div className='flex h-full w-full overflow-auto'>
      <AllItems />
    </div>
  )
}

export default protectedRoute(Quiz)
