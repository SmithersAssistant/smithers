import React from 'react'
import {css} from 'aphrodite'
import Event, {FOCUS_INPUT, PUT_INPUT} from 'Event'
import styles from './NavbarStyles'

// UI Elements
import Icon from 'components/UI/Icon'
import pluginManager from 'PluginSystem/PluginManager'

const Keys = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
  TAB: 9,
  ESC: 27
};

const isTextSelected = (input) => {
  const startPos = input.selectionStart;
  const endPos = input.selectionEnd;
  const doc = document.selection;

  if (doc && doc.createRange().text.length != 0) {
    return true
  } else if (!doc && input.value.substring(startPos, endPos).length != 0) {
    return true
  }

  return false
};

const Navbar = React.createClass({
  getDefaultProps() {
    return {
      canGoBack: false,
      canGoForward: false
    };
  },

  componentDidMount() {
    this.refs.input.focus();

    Event.on(FOCUS_INPUT, () => this.refs.input.focus());
    Event.on(PUT_INPUT, ({
      text,
      selectStart,
      selectEnd
    }) => {
      this.refs.input.value = text;
      this.refs.input.focus();
      if (selectStart && selectEnd) {
        this.refs.input.setSelectionRange(selectStart, selectEnd)
      }
    })
  },

  handleKeyDown(e) {
    if (e.keyCode == Keys.TAB) {
      e.preventDefault();

      if (e.shiftKey) {
        this.props.focusPrevTab()
      } else {
        this.props.focusNextTab()
      }
    }
  },

  handleKeyUp(e) {
    e.preventDefault();

    const {input} = this.refs;
    const {handleInput, addTab} = this.props;

    switch (e.keyCode) {
      case Keys.ENTER:
        if (e.metaKey || e.ctrlKey) {
          addTab()
        }

        const value = e.target.value;
        handleInput(value);
        pluginManager.execute(value);
        input.value = "";
        break;
      case Keys.ESC:
        this.selectInputText();
        break;
      case Keys.UP:
        if (this.props.canGoBack) {
          this.props.previousCommand()
          setTimeout(() => {
            this.refs.input.value = this.props.command
          }, 1)
        }
        break;
      case Keys.DOWN:
        if (this.props.canGoForward) {
          this.props.nextCommand()
          setTimeout(() => {
            this.refs.input.value = this.props.command
          }, 1)
        }
        break;
    }
  },

  selectInputText() {
    const {input} = this.refs;
    input && input.setSelectionRange(isTextSelected(input) ? input.value.length : 0, input.value.length)
  },

  render() {
    return (
      <div className={css(styles.headerStyles)} onClick={() => this.refs.input.focus()}>
        <div className={css(styles.inputWrapperStyles)}>
          <div className={css(styles.inputIconStyles)}>
            <Icon icon="terminal"/>
          </div>
          <input
            className={css(styles.inputStyles)}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            ref="input"
            type="text"
            placeholder="Type your commands here..."
          />
        </div>
      </div>
    )
  }
});

export default Navbar
