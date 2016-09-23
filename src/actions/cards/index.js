import {v4 as uuid} from 'uuid'
import {getActiveTab} from 'state'

import {
  ADD_CARD,
  INJECT_SHARED_CARD,
  SAVE_CARD_STATE,
  REMOVE_CARD,
  CLEAR_CARD_HISTORY
} from './types'

export const addCard = (card, props = {}, relation = getActiveTab()) => ({
  type: ADD_CARD,
  card,
  props,
  id: uuid(),
  relation
})

export const injectSharedCard = (id, card, props = {}, state = {}) => ({
  type: INJECT_SHARED_CARD,
  id,
  card,
  props,
  state,
  relation: getActiveTab()
})

export const saveCardState = (id, state) => ({
  type: SAVE_CARD_STATE,
  id,
  state
})

export const clearCards = () => ({
  type: CLEAR_CARD_HISTORY,
  tab: getActiveTab()
})

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  id
})
