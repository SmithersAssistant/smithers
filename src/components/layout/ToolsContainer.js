// Dependencies
// import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {connect} from 'react-redux'

// Actions
import {clearCards} from 'actions/index'

// Component
import Tools from './Tools'

const currentTabHasCards = (active, cards) => {
  return cards.filter(card => card.relation == active).length > 0
};

const mapStateToProps = (state) => ({
  canClear: currentTabHasCards(state.tabs.active, state.cards.cards)
});

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearCards())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tools)
