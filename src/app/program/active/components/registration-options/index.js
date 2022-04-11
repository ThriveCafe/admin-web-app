import { withActiveProgramRegistrationsStore } from '../../../stores/use-active-program-registrations'
import Create from './components/create'
import List from './components/list'

const RegistrationOptions = () => {
  return (
    <div>
      <Create />
      <List />
    </div>
  )
}

export default withActiveProgramRegistrationsStore(RegistrationOptions)
