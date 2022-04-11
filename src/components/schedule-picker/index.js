import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import RRule from 'rrule'

import Input from '../input'
import SectionHeader from '../section-header'

const SchedulePicker = ({ onChange }) => {
  const [count, updateCount] = useState(3)
  const [duration, updateDuration] = useState(60)
  const [time, updateTime] = useState(
    DateTime.now().set({ minutes: 0, seconds: 0 }).plus({ hours: 1 }),
  )

  const slots = useMemo(() => {
    const rule = new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      dtstart: time.toJSDate(),
      count,
    })

    return rule.all()
  }, [count, time])

  useEffect(() => {
    onChange(slots.map((slot) => ({ startTime: slot.getTime() })))
  }, [onChange, slots])

  return (
    <div>
      <SectionHeader title='Schedule' />
      <div className='flex'>
        <div className='flex-1 pr-8'>
          <Input
            className='mb-4 bg-gray-100'
            label='Frequency'
            type='text'
            required
            value='Weekly'
            disabled
          />
          <Input
            className='mb-4'
            label='Count'
            type='number'
            required
            value={count}
            onChange={(e) => updateCount(e.target.value)}
          />
          <Input
            className='mb-4'
            label='Duration (minutes)'
            type='number'
            required
            value={duration}
            onChange={(e) => updateDuration(e.target.value)}
          />
          <Input
            className='mb-4'
            label='Start Time'
            type='datetime-local'
            required
            value={time.toFormat(`yyyy-MM-dd'T'hh:mm`)}
            onChange={(e) =>
              updateTime(
                DateTime.fromFormat(e.target.value, `yyyy-MM-dd'T'hh:mm`),
              )
            }
          />
        </div>

        <div className='flex-1 border-l pl-8'>
          <p className='text-sm font-medium text-gray-700'>
            Generated Schedule:
          </p>
          <ul className='mt-2 space-y-3'>
            {slots.map((slot) => (
              <li
                key={slot.toString()}
                className='overflow-hidden rounded-md border bg-white p-4'
              >
                {DateTime.fromJSDate(slot).toFormat(`hh:mm a, dd MMM yyyy`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SchedulePicker
