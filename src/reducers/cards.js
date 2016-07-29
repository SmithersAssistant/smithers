import {
  ADD_CARD,
  SAVE_CARD_STATES,
  CLEAR_CARD_HISTORY,
  REMOVE_CARD,
  REMOVE_TAB
} from '../actions/types'

const card = (state, action) => {
  switch(action.type) {
    case ADD_CARD:
      return {
        card: action.card,
        props: action.props,
        state: {},
        id: action.id,
        relation: action.relation
      };
    default:
      return state
  }
};

const cards = (state = [], action) => {
  switch(action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, card(undefined, action)]
      };
    case SAVE_CARD_STATES:
      return {
        ...state,
        cards: state.cards.map(item => {
          action.data.forEach(cardState => {
            if (item.id === cardState.id) {
              item = {
                ...item,
                state: cardState.state || {}
              }
            }
          })

          return item;
        })
      }
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(item => item.id != action.id)
      };
    case CLEAR_CARD_HISTORY:
      return {
        ...state,
        cards: [...state.cards.filter(card => card.relation != action.tab)]
      };
    case REMOVE_TAB:
      return {
        ...state,
        cards: state.cards.filter(item => item.relation != action.id)
      };
    default:
      return state
  }
};

export const defaultState = {
  cards: []
};

export default cards
