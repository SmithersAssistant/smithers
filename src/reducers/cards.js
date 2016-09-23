import {
  ADD_CARD,
  INJECT_SHARED_CARD,
  SAVE_CARD_STATE,
  CLEAR_CARD_HISTORY,
  REMOVE_CARD,
  REMOVE_TAB
} from '../actions/types'

const card = (state, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        card: action.card,
        props: action.props,
        state: {},
        id: action.id,
        relation: action.relation
      }
    case INJECT_SHARED_CARD:
      return {
        card: action.card,
        props: action.props,
        state: action.state,
        id: action.id,
        relation: action.relation
      }
    default:
      return state
  }
}

const cards = (state = [], action) => {
  switch (action.type) {
    case INJECT_SHARED_CARD:
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, card(undefined, action)]
      }
    case SAVE_CARD_STATE:
      return {
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
      }
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(item => item.id !== action.id)
      }
    case CLEAR_CARD_HISTORY:
      return {
        ...state,
        cards: [...state.cards.filter(card => card.relation !== action.tab)]
      }
    case REMOVE_TAB:
      return {
        ...state,
        cards: state.cards.filter(item => item.relation !== action.id)
      }
    default:
      return state
  }
}

export const defaultState = {
  cards: []
}

export default cards
