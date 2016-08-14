// Dependencies
import {connect} from 'react-redux'
import Event, {FOCUS_INPUT} from 'Event'

// Actions
import {
  handleInput,
  addTab,
  focusNextTab,
  focusPrevTab,
  previousCommand,
  nextCommand
} from 'actions/index'

// Component
import Navbar from './Navbar'

const mapStateToProps = (state) => ({
  command: state.commands.command,
  canGoBack: state.commands.currentCommand !== 0,
  canGoForward: state.commands.currentCommand < (state.commands.past || []).length
});

const mapDispatchToProps = (dispatch) => ({
  handleInput: (value) => dispatch(handleInput(value)),
  addTab: (title) => {
    dispatch(addTab(title));
    Event.fire(FOCUS_INPUT)
  },
  focusNextTab: (places) => dispatch(focusNextTab(places)),
  focusPrevTab: (places) => dispatch(focusPrevTab(places)),
  previousCommand: () => dispatch(previousCommand()),
  nextCommand: () => dispatch(nextCommand())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
