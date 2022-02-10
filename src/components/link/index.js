import { default as NextLink } from 'next/link'
import PropTypes from 'prop-types'

const Link = ({ href, children, className, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a className={`cursor:pointer hover:underline ${className}`} {...props}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link

Link.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
}

Link.defaultProps = {
  className: '',
}
