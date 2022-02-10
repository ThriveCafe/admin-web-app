import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { always } from 'ramda'
import create from 'zustand'

import immer from './immer-middleware'
import logger from './logger-middleware'

/**
 * Creates a zustand store with middlewares applied
 */

const createStore = (storeGenerator = always({})) =>
  createSelectorFunctions(create(logger(immer(storeGenerator))))

export default createStore
