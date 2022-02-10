import dynamic from 'next/dynamic'

/**
 * This utility function takes a dynamic import function returning a component and uses Next JS dynamic
 * import with ssr: false to disable Server Side Rendering for the provided component.
 *
 * @param importFn
 * @returns {function(*)}
 */
const noSSR = (importFn) => {
  const Component = dynamic(importFn, { ssr: false })

  return function ComponentWithoutSSR(props) {
    return <Component {...props} />
  }
}

export default noSSR
