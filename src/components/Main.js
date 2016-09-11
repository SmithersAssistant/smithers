import React from 'react'
import isEmpty from 'lodash/isEmpty'

import pluginManager from 'pluginSystem/pluginManager'

import {dispatch} from 'store'
import {removeCard} from 'actions/index'
import Event, {OPEN_HELP} from 'Event'
import {withStyles} from 'components/functions'

const RestorableComponent = React.createClass({
  getDefaultProps () {
    return {
      registerCard: () => {} //  NOOP
    }
  },
  componentDidMount () {
    const {component} = this.refs
    const {cardContainer, registerCard, isFunctional} = this.props

    if (!isFunctional) {
      if (component && component.isMounted()) {
        if (!isEmpty(cardContainer.state)) {
          component.setState(cardContainer.state)
        }
      }

      registerCard(cardContainer.id, {
        getState () {
          return component.state
        }
      })
    }
  },
  componentWillUnmount () {
    let {isFunctional, cardContainer, unRegisterCard} = this.props
    if (!isFunctional) {
      unRegisterCard(cardContainer.id)
    }
  },
  render () {
    let {Component, componentProps, isFunctional, __CARD_ID__} = this.props
    componentProps = {
      ...componentProps,
      removeCard: () => dispatch(removeCard(__CARD_ID__))
    }

    return isFunctional ? <Component {...componentProps} /> : <Component {...componentProps} ref='component' />
  }
})

const isFunctionalComponent = (Component) => {
  return Component.length === 1
}

const NoCards = withStyles(({ theme, px }) => ({
  noCardsWrapper: {
    ...theme.center,
    width: '80%'
  },
  noCardsTitleStyles: {
    color: '#ccc',
    textAlign: 'center',
    cursor: 'default'
  },
  noCardsHelpKey: {
    fontFamily: 'Roboto',
    background: 'white',
    padding: px(5, 14),
    borderRadius: 3,
    ...theme.shadow1
  }
}))(({ styles }) => (
  <div className={styles.noCardsWrapper}>
    <h1 className={styles.noCardsTitleStyles}>Type <kbd
      className={styles.noCardsHelpKey}
      onClick={() => {
        Event.fire(OPEN_HELP)
      }}
    >help</kbd> to see available commands</h1>
  </div>
))

const Card = (cardContainer, registerCard, unRegisterCard) => {
  const C = pluginManager.resolveComponent(cardContainer.card)

  if (!C) {
    return null
  }

  const isFunctional = isFunctionalComponent(C)

  return (
    <div key={cardContainer.id}>
      <RestorableComponent
        key={cardContainer.id}
        __CARD_ID__={cardContainer.id}
        Component={C}
        componentProps={cardContainer.props}
        cardContainer={cardContainer}
        isFunctional={isFunctional}
        registerCard={registerCard}
        unRegisterCard={unRegisterCard}
      />
    </div>
  )
}

const Main = React.createClass({
  getDefaultProps () {
    return {
      saveCardStates: () => {} // NOOP
    }
  },
  componentWillMount () {
    this.cards = []
  },
  componentDidMount () {
    this.saveComponentStates()
  },
  componentWillUnmount () {
    window.cancelAnimationFrame(this._retrieveState)
  },
  registerCard (id, {getState}) {
    this.cards = [
      ...this.cards,
      {
        id,
        getState
      }
    ]
  },
  saveComponentStates () {
    setTimeout(() => {
      this._retrieveState = window.requestAnimationFrame(() => {
        if (this.cards.length > 0) {
          const cardStates = this.cards.map(card => ({
            id: card.id,
            state: card.getState()
          }))

          const filteredCardStates = cardStates.filter(data => data.state !== null)

          if (filteredCardStates.length > 0 && JSON.stringify(filteredCardStates) !== this.oldCardStates) {
            this.oldCardStates = JSON.stringify(filteredCardStates)
            this.props.saveCardStates(filteredCardStates)
          }
        }

        this.saveComponentStates()
      })
    }, 1000) // Every second
  },
  unRegisterCard (id) {
    this.cards = this.cards.filter(c => c.id !== id)
  },
  render () {
    let {cards, styles} = this.props

    cards = cards.map((c) => Card(c, this.registerCard, this.unRegisterCard)).filter(c => c !== null)

    return (
      <div className={styles.cardsStyles}>
        {cards.length > 0 ? cards : NoCards()}
      </div>
    )
  }
})

export default withStyles(({ theme }) => ({
  cardsStyles: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: theme.cardSpace
  }
}))(Main)
