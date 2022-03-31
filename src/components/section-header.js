import PropTypes from 'prop-types'

const SectionHeader = ({ title }) => {
  return (
    <div className='relative my-8'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='relative flex justify-start'>
        <span className='bg-white pr-3 text-lg font-medium text-gray-900'>
          {title}
        </span>
      </div>
    </div>
  )
}

export default SectionHeader

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
}
