import QuizProgramMap from '@/app/program/active/components/general/components/quiz'

import Cover from './components/cover'
import Gallery from './components/gallery'
import Info from './components/info'
import Resources from './components/resources'
import Seo from './components/seo'

const General = () => {
  return (
    <div className='inline-block w-full py-8 align-bottom'>
      <Info />
      <Cover />
      <Seo />
      <QuizProgramMap />
      <Gallery />
      <Resources />
    </div>
  )
}

export default General
