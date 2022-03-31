import { PencilAltIcon, ViewGridAddIcon } from '@heroicons/react/solid'

const AppBarLinks = [
  {
    name: 'Quiz & Surveys',
    route: '/quiz',
    icon: PencilAltIcon,
    external: false,
  },
  {
    name: 'Programs',
    route: '/program',
    icon: ViewGridAddIcon,
    external: false,
  },
]

export default AppBarLinks
