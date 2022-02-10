/**
 * This utility function returns true if the current environment
 * is a server, or false if it is a browser. This can be useful
 * for SSR and related operations.
 *
 * @returns {boolean}
 */

const isServer = () => !process.browser

export default isServer
