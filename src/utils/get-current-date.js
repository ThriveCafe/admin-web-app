import { DateTime } from 'luxon'

const getCurrentDate = () => DateTime.now().toFormat('yyyy-MM-dd')

export const parseDate = (dateString = '') => {
  const [year, month, date] = dateString.split('-')

  const parsed = new Date()

  parsed.setFullYear(Number(year))
  parsed.setMonth(Number(month - 1))
  parsed.setDate(Number(date))

  return parsed
}

export default getCurrentDate
