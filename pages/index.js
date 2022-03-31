import Link from '@/components/link'
import useAuth from '@/modules/user/stores/use-auth'

const Home = () => {
  const currentUser = useAuth.use.current()

  return (
    <div className='h-full w-full'>
      {!currentUser ? (
        <Link href='/auth/login'>Login</Link>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Select a section from the sidebar</p>
        </div>
      )}
    </div>
  )
}

export default Home
