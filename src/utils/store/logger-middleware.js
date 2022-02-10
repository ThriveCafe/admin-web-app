const loggingEnabled = Boolean(process.env.NEXT_PUBLIC_LOGGING_ENABLED)

const logger = (config) => (set, get, api) =>
  config(
    !loggingEnabled
      ? set
      : (args) => {
          const initialState = get()

          set(args)

          const finalState = get()

          // eslint-disable-next-line no-console
          console.log('STORE_UPDATED', { initialState, finalState })
        },
    get,
    api,
  )

export default logger
