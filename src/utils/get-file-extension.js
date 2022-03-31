const getFileExtension = ({ name, type }) =>
  name.split('.').slice(-1)[0] || type.slice('/').slice(-1)[0]

export default getFileExtension
