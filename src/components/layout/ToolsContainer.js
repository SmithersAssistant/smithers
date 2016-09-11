// Dependencies
// import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {connect} from 'react-redux'

// Actions
import {clearCards} from 'actions/index'

// Component
import Tools from './Tools'

const currentTab = (active, cards, visible) => {
  return visible
    ? cards.filter(card => card.relation === active)
    : cards
}

const currentTabHasCards = (active, cards, visible) => {
  return currentTab(active, cards, visible).length > 0
}

const mapStateToProps = (state) => ({
  canClear: currentTabHasCards(state.tabs.active, state.cards.cards, state.tabs.visible),
  activeCards: currentTab(state.tabs.active, state.cards.cards, state.tabs.visible).length
})

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearCards())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tools)
