import React from 'react'
import Icon from '../UI/Icon'
import {Collection, CollectionItem} from '../UI/Collection'

const noop = () => {}

const Suggestions = React.createClass({
  getInitialState () {
    this.resolveSuggestions(this.props.suggestions)

    return {
      suggestions: [],
      currentSuggestion: -1,
      resolved: false
    }
  },
  getDefaultProps () {
    return {
      onSelect: noop,
      onActive: noop
    }
  },
  componentWillReceiveProps (newProps) {
    if (newProps.suggestions !== this.props.suggestions) {
      this.resolveSuggestions(newProps.suggestions)
    }

    if (newProps.title !== this.props.title) {
      this.setState({ currentSuggestion: -1 })
    }
  },
  resolveSuggestions (suggestions) {
    Promise.resolve(suggestions)
      .then(suggestions => {
        if (this.isMounted()) {
          this.setState({ suggestions, resolved: true })
          return
        }

        setTimeout(() => {
          // We have to check it again because at this time
          // it can happen that the component has been unmounted
          if (this.isMounted()) {
            this.setState({ suggestions, resolved: true })
          }
        }, 20)
      })
  },
  getStylesFor (styles, active) {
    if (typeof styles === 'function') {
      return styles(active)
    }

    return styles
  },
  goDown () {
    const next = (this.state.currentSuggestion + 1) % this.state.suggestions.length

    this.setState({currentSuggestion: next}, () => {
      this.props.onActive(this.state.suggestions[next], next)
    })
  },
  goUp () {
    const prev = (this.state.suggestions.length + this.state.currentSuggestion - 1) % this.state.suggestions.length

    this.setState({currentSuggestion: prev}, () => {
      this.props.onActive(this.state.suggestions[prev], prev)
    })
  },
  render () {
    let {title, onSelect, externalStyles, externalSuggestionStyles, externalActiveSuggestionStyles} = this.props
    let {currentSuggestion, suggestions, resolved} = this.state

    return (!(resolved && suggestions.length <= 0)) && (
      <Collection className={externalStyles}>
        {title && (
          <CollectionItem>
            <strong>{title.toUpperCase()}</strong>
          </CollectionItem>
        )}
        {!resolved && (
          <CollectionItem>
            <Icon icon='spinner fa-pulse' /> loading...
          </CollectionItem>
        )}
        {Array.isArray(suggestions) && suggestions.map((suggestion, i) => {
          const isActive = currentSuggestion === i

          const itemStyles = [
            this.getStylesFor(externalSuggestionStyles, isActive),
            this.getStylesFor(externalActiveSuggestionStyles, isActive)
          ]

          return (
            <CollectionItem
              key={`suggestion_${i}`}
              className={itemStyles}
              scrollIntoView={isActive}
              onClick={() => onSelect(suggestion, i)}
            >{isActive && <Icon icon='angle-double-right' />} {suggestion.value || suggestion}</CollectionItem>
          )
        })}
      </Collection>
    )
  }
})

export default Suggestions
