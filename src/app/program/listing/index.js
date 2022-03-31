import AllItems from '@/app/program/components/all-items'
import protectedRoute from '@/utils/protected-route'

const Program = () => {
  return (
    <div className='flex h-full w-full overflow-auto'>
      <AllItems />
    </div>
  )
}

export default protectedRoute(Program)
