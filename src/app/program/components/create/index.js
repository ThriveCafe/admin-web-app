import { identity, propOr } from 'ramda'

import useAllProgram from '@/app/program/stores/use-all-program'
import Button from '@/components/button'

const createProgramSelector = propOr(identity, 'createProgram')

const Create = () => {
  const createProgram = useAllProgram(createProgramSelector)

  return (
    <Button
      className='ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      onClick={() => createProgram()}
    >
      Create Program
    </Button>
  )
}

export default Create
