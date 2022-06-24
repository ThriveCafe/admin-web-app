import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Link from '@/components/link'
import useAuth from '@/modules/user/stores/use-auth'

const Home = () => {
  const router = useRouter()
  const currentUser = useAuth.use.current()

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

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
