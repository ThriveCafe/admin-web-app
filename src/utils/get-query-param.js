import isServer from './is-server'

const getQueryParam = (
  name,
  location = isServer() ? 'https://thrivecafe.in' : window.location.href,
) => decodeURIComponent(new URL(location).searchParams.get(name) || '')

export default getQueryParam
