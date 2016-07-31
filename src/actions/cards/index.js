import {v4 as uuid} from 'uuid'
import {getActiveTab} from 'stateHelpers'

import {
  ADD_CARD,
  SAVE_CARD_STATES,
  REMOVE_CARD,
  CLEAR_CARD_HISTORY
} from './types'

export const addCard = (card, props = {}, relation = getActiveTab()) => ({
  type: ADD_CARD,
  card,
  props,
  id: uuid(),
  relation
});

export const saveCardStates = (data) => ({
  type: SAVE_CARD_STATES,
  data
})

export const clearCards = () => ({
  type: CLEAR_CARD_HISTORY,
  tab: getActiveTab()
});

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  id
});
