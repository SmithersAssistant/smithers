import reducer from './reducer'

import {
  ADD_CARD,
  INJECT_SHARED_CARD,
  SAVE_CARD_STATE,
  CLEAR_CARD_HISTORY,
  REMOVE_CARD,
  REMOVE_TAB
} from '../actions/types'

const card = reducer({
  [ADD_CARD]: (state, action) => ({
    card: action.card,
    props: action.props,
    state: {},
    id: action.id,
    relation: action.relation
  }),
  [INJECT_SHARED_CARD]: (state, action) => ({
    card: action.card,
    props: action.props,
    state: action.state,
    id: action.id,
    relation: action.relation
  })
})

const cards = reducer({
  [INJECT_SHARED_CARD]: (state, action) => ({
    ...state,
    cards: [...state.cards, card(undefined, action)]
  }),
  [ADD_CARD]: (state, action) => ({
    ...state,
    cards: [...state.cards, card(undefined, action)]
  }),
  [SAVE_CARD_STATE]: (state, action) => ({
    ...state,
    cards: state.cards.map(card => {
      if (card.id === action.id) {
        card = {
          ...card,
          state: {
            ...card.state,
            ...(action.state || {})
          }
        }
      }
      return card
    })
  }),
  [REMOVE_CARD]: (state, action) => ({
    ...state,
    cards: state.cards.filter(item => item.id !== action.id)
  }),
  [CLEAR_CARD_HISTORY]: (state, action) => ({
    ...state,
    cards: [...state.cards.filter(card => card.relation !== action.tab)]
  }),
  [REMOVE_TAB]: (state, action) => ({
    ...state,
    cards: state.cards.filter(item => item.relation !== action.id)
  })
}, [])

export const defaultState = {
  cards: []
}

export default cards
