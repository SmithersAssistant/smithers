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
  random: Math.random(),
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
  focusNextTab: () => dispatch(focusNextTab()),
  focusPrevTab: () => dispatch(focusPrevTab()),
  previousCommand: () => dispatch(previousCommand()),
  nextCommand: () => dispatch(nextCommand())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
