import {v4 as uuid} from 'uuid'
import {getState} from '../../store'

import {
  ADD_CARD,
  SAVE_CARD_STATES,
  REMOVE_CARD,
  CLEAR_CARD_HISTORY
} from './types'

const fetchActiveTab = () => {
  return getState().tabs.active;
};

export const addCard = (card, props = {}, relation = fetchActiveTab()) => ({
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
  tab: fetchActiveTab()
});

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  id
});
