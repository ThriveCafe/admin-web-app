import { identity } from 'ramda'

const renderOnLoad =
  (useStore, selector = identity) =>
  (Component) =>
    function ComponentWithStore(props) {
      const data = useStore(selector)

      return !data ? null : <Component {...props} />
    }

export default renderOnLoad
