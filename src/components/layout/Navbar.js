import React from 'react'
import {css} from 'aphrodite'
import Event, {FOCUS_INPUT, PUT_INPUT} from 'Event'
import styles from './NavbarStyles'
import {Collection, CollectionItem} from 'components/UI/Collection'
import flatMap from 'lodash/flatMap'
import {fuzzysearch} from 'components/functions'
import debounce from 'lodash/debounce'
import {areTabsVisible} from 'stateHelpers'
import Suggestions from './Suggestions';

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

const CONTEXT_SUGGESTIONS = 'CONTEXT_SUGGESTIONS';
const CONTEXT_VARIABLES = 'CONTEXT_VARIABLES';
const CONTEXT_EMPTY = 'CONTEXT_EMPTY';

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

let commands = [];
setTimeout(() => {
  commands = flatMap(pluginManager.list().map(plugin => plugin.commands));
});

const Navbar = React.createClass({
  getInitialState() {
    return {
      suggestions: [],
      suggestion: {},
      variables: {},
      currentSuggestion: -1,
      context: CONTEXT_EMPTY,
      showVariables: false,
    }
  },

  getDefaultProps() {
    return {
      canGoBack: false,
      canGoForward: false
    };
  },

  isContext(...contexts) {
    return contexts.includes(this.state.context);
  },

  getInput() {
    return this.refs.input;
  },

  resetSuggestions() {
    this.setState(this.getInitialState());
  },

  setSuggestions(value) {
    const suggestions = this.getSuggestionsFor(value);

    this.setState({
      suggestions,
      context: CONTEXT_SUGGESTIONS,
      currentSuggestion: -1,
      currentVariable: -1,
      showVariables: false
    });
  },

  componentWillMount: function() {
    this.showVariables = debounce(this.showVariables, 500);
  },

  componentDidMount() {
    this.getInput().focus();

    Event.on(FOCUS_INPUT, () => this.getInput().focus());
    Event.on(PUT_INPUT, ({
      text,
      selectStart,
      selectEnd
    }) => {
      this.getInput().value = text;
      this.getInput().focus();
      if (selectStart && selectEnd) {
        this.getInput().setSelectionRange(selectStart, selectEnd)
      }
    })
  },

  parseUsage({usage, arguments: args, optionals}) {
    let result = usage.split(' ');

    if (args.length > 0) {
      args.forEach(arg => {
        result = result.map(item => {
          if (item === arg.match) {
            return <span className={css(styles.argument)}>{arg.humanized}</span>
          }

          return item;
        });
      });
    }

    if (optionals.length > 0) {
      optionals.forEach(arg => {
        result = result.map(item => {
          if (item === arg.match) {
            return <span className={css(styles.optional)}>{arg.humanized}</span>
          }

          return item;
        });
      });
    }

    return (
      <span>
          {result.map((item, i) => <span key={i} style={{
            marginRight: 4
          }}>{item}</span>)}
        </span>
    )
  },

  getSuggestionsFor(text) {
    if (text.trim().length <= 0) {
      return [];
    }

    return commands
      .filter(command => fuzzysearch(text.trim(), command.usage) || command.name.test(text))
      .map(command => {
        return ({
          command,
          value: this.parseUsage(command)
        });
      });
  },

  executeCommand(value) {
    const {handleInput} = this.props;

    handleInput(value);
    pluginManager.execute(value);
    this.getInput().value = "";

    this.resetSuggestions();
  },

  handleKeyUp(e) {
    e.preventDefault();

    const {addTab} = this.props;

    if (this.isContext(CONTEXT_EMPTY, CONTEXT_SUGGESTIONS, CONTEXT_VARIABLES)) {
      if(e.keyCode === Keys.ESC) {
        this.selectInputText();
        this.resetSuggestions()
      }
    }

    if (this.isContext(CONTEXT_VARIABLES)) {
      if (e.keyCode === Keys.ENTER) {
        if (this.refs.variables) {
          this.handleVariableSelection();
        } else {
          this.setState({ context: CONTEXT_EMPTY });
        }
      }
    }

    if (this.isContext(CONTEXT_EMPTY, CONTEXT_SUGGESTIONS)) {
      switch (e.keyCode) {
        case Keys.ENTER:
          if (e.metaKey || e.ctrlKey) {
            addTab()
          }

          this.executeCommand(e.target.value);
          break;
        case Keys.UP:
          if (this.props.canGoBack && this.state.suggestions.length <= 0) {
            this.props.previousCommand()
            setTimeout(() => {
              this.getInput().value = this.props.command
            })
          }
          break;
        case Keys.DOWN:
          if (this.props.canGoForward && this.state.suggestions.length <= 0) {
            this.props.nextCommand()
            setTimeout(() => {
              this.getInput().value = this.props.command
            })
          }
          break;
      }
    }
  },

  handleKeyDown(e) {
    // Tab through tabsbar if we don't have suggestions and tabs are visible
    if (e.keyCode == Keys.TAB && this.state.suggestions.length <= 0 && areTabsVisible()) {
      e.preventDefault();

      e.shiftKey
        ? this.props.focusPrevTab()
        : this.props.focusNextTab();
    }

    // If you have suggestions
    if (this.state.suggestions.length > 0) {
      if (e.keyCode === Keys.UP || (e.keyCode === Keys.TAB && e.shiftKey)) {
        e.preventDefault();

        if (this.isContext(CONTEXT_SUGGESTIONS)) {
          this.refs.suggestions.goUp();
        }

        if (this.isContext(CONTEXT_VARIABLES)) {
          this.refs.variables.goUp();
        }
      }

      if (e.keyCode === Keys.DOWN || (e.keyCode === Keys.TAB && !e.shiftKey)) {
        e.preventDefault();

        if (this.isContext(CONTEXT_SUGGESTIONS)) {
          this.refs.suggestions.goDown();
        }

        if (this.isContext(CONTEXT_VARIABLES)) {
          this.refs.variables.goDown();
        }
      }
    }
  },

  handleVariableSelection(item = this._currentVariableValue, variableSet = true) {
    this.setState({
      variables: {
        ...this.state.variables,
        [this._currentVariable]: {
          value: item,
          set: variableSet,
        }
      }
    }, () => {
      let {suggestion, variables} = this.state;
      let input = suggestion.command.usage;

      Object.keys(variables).forEach((key) => {
        input = input.replace(`<${key}>`, variables[key].value);
      });

      if (
        suggestion.command.arguments.length === Object.keys(variables).length &&
        !Object.keys(variables).map(item => variables[item].set).includes(false)
      ) {
        this.setState({
          context: CONTEXT_EMPTY
        });
      }

      setTimeout(() => {
        Event.fire(PUT_INPUT, {text: input});
      })
    });
  },

  handleSuggestionSelection(suggestion, currIndex = null) {
    if (suggestion.command.arguments.length > 0 || suggestion.command.arguments.length > 0) {
      this.setSuggestionInInput(suggestion, currIndex);
    } else {
      this.executeCommand(suggestion.command.usage);

      this.resetSuggestions();
    }
  },

  setSuggestionInInput(_suggestion, currIndex = null) {
    const suggestion = _suggestion || this.state.suggestions[this.state.currentSuggestion];

    setTimeout(() => {
      Event.fire(PUT_INPUT, {
        text: suggestion.command.usage,
        selectStart: suggestion.command.usage.indexOf('<'),
        selectEnd: suggestion.command.usage.indexOf('>') + 1
      });

      const vars = [
        ...suggestion.command.arguments,
        ...suggestion.command.optionals
      ];

      if (currIndex !== null) {
        this.setState({
          currentSuggestion: currIndex,
          suggestion: {
            ...this.state.suggestions[currIndex],
            variables: {}
          },
        }, () => {
          this.showVariables(vars.length > 0);
        });
      } else {
        this.showVariables(vars.length > 0);
      }
    })
  },

  showVariables(show = true) {
    let data = {showVariables: show};
    if (show) {
      data.context = CONTEXT_VARIABLES;
    }

    this.setState(data);
  },

  selectInputText() {
    const input = this.getInput();
    input && input.setSelectionRange(isTextSelected(input) ? input.value.length : 0, input.value.length)
  },

  renderVariables() {
    const {suggestion, variables} = this.state;

    if (!suggestion) {
      return null;
    }

    const vars = [
      ...suggestion.command.arguments,
      ...suggestion.command.optionals
    ];

    if (vars.length <= 0) {
      return null;
    }

    const filteredVars = vars.filter(variable => {
      return !variables[variable.contents] || variables[variable.contents].set === false
    });

    if (filteredVars.length <= 0) {
      return null;
    }

    const variable = filteredVars[0].contents;

    const command = vars.find(cmd => cmd.match === `<${variable}>`);

    if (!command) {
      return null;
    }

    this._currentVariable = variable;

    const flatVariables = {};
    Object.keys(variables).forEach(key => {
      flatVariables[key] = variables[key].value;
    })

    return (
      <Suggestions
        ref="variables"
        suggestions={command.data(flatVariables)}
        active={true}
        title={command.humanized.toUpperCase()}
        externalStyles={[styles.suggestions, styles.positionSuggestions]}
        externalSuggestionStyles={styles.suggestion}
        externalActiveSuggestionStyles={(isActive) => isActive ? styles.activeSuggestion : undefined}
        onActive={(item) => {
          this._currentVariableValue = item;
          this.handleVariableSelection(item, false);
        }}
        onSelect={(item) => this.handleVariableSelection(item, true)}
      />
    )
  },

  render() {
    const {suggestions, showVariables} = this.state

    return (
      <div className={css(styles.headerStyles)} onClick={() => this.getInput().focus()}>
        <div className={css(styles.inputWrapperStyles)}>
          <div className={css(styles.inputIconStyles)}>
            <Icon icon="terminal"/>
          </div>
          <input
            className={css(styles.inputStyles)}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onChange={(e) => {
              this.setSuggestions(e.target.value);
            }}
            ref="input"
            type="text"
            placeholder="Type your commands here..."
          />

          {/* PRE-FILL VARIABLES*/}
          {showVariables && this.renderVariables()}

          {/* SUGGESTIONS */}
          <Suggestions
            ref="suggestions"
            active={suggestions.length > 0 && !showVariables}
            suggestions={suggestions}
            externalStyles={[styles.suggestions, styles.positionSuggestions]}
            externalSuggestionStyles={styles.suggestion}
            externalActiveSuggestionStyles={(isActive) => isActive ? styles.activeSuggestion : undefined}
            onActive={(suggestion, currIndex) => this.setSuggestionInInput(suggestion, currIndex)}
            onSelect={(suggestion, currIndex) => this.handleSuggestionSelection(suggestion, currIndex)}
          />
        </div>
      </div>
    )
  }
});

export default Navbar
