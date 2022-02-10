import Link from '@/components/link'
import useAuth from '@/modules/user/stores/use-auth'

const Home = () => {
  const currentUser = useAuth.use.current()

  return (
    <div className='container'>
      {!currentUser ? (
        <Link href='/auth/login'>Login</Link>
      ) : (
        <p>Select a section from the sidebar</p>
      )}
    </div>
  )
}

export default Home
