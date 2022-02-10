import ms from 'ms'

/**
 * Determines whether SSR will be turned on for pages during local development
 * @type {boolean}
 */

export const DISABLE_SSR_IN_DEVELOPMENT = true

/**
 * Controls the duration for ISR revalidation. Value is in seconds.
 * @type {number}
 */
export const SSR_REVALIDATION_INTERVAL = ms('12h') / 1000
