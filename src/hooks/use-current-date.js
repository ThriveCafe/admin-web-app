import ms from 'ms'
import { useEffect, useState } from 'react'

import getCurrentDate from '@/utils/get-current-date'

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate())

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentDate(getCurrentDate()),
      ms('1m'),
    )

    return () => clearInterval(interval)
  }, [])

  return currentDate
}

export default useCurrentDate
