import React from 'react'
import isEmpty from 'lodash/isEmpty'

import pluginManager from 'PluginSystem/PluginManager'

import {dispatch, getState} from 'store'
import {removeCard} from 'actions/index'

import {StyleSheet, css} from 'aphrodite'
import {theme} from 'styles/theme'

const styles = StyleSheet.create({
  cardsStyles: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: theme.cardSpace
  },
  noCardsTitleStyles: {
    color: '#ccc',
    textAlign: 'center',
    cursor: 'default'
  }
})

const getCardData = (id) => {
  const {cards} = getState().cards

  return cards.find((card) => card.id === id)
}

const RestorableComponent = React.createClass({
  getDefaultProps() {
    return {
      registerCard: () => {}, //  NOOP
    }
  },
  componentDidMount() {
    const {component} = this.refs
    const {cardContainer, registerCard, isFunctional} = this.props

    if (!isFunctional) {
      if (component && component.isMounted()) {
        if (!isEmpty(cardContainer.state)) {
          component.setState(cardContainer.state)
        }
      }

      registerCard(cardContainer.id, {
        getState() {
          return component.state
        }
      })
    }
  },
  componentWillUnmount() {
    let {isFunctional, cardContainer, unRegisterCard} = this.props
    if (!isFunctional) {
      unRegisterCard(cardContainer.id)
    }
  },
  render() {
    let {Component, componentProps, isFunctional} = this.props;
    componentProps = {
      ...componentProps,
      removeCard: () => dispatch(removeCard(componentProps.__CARD_ID__))
    }

    return isFunctional ? <Component {...componentProps} /> : <Component {...componentProps} ref="component"/>
  }
})

const isFunctionalComponent = (Component) => {
  return Component.length == 1
}

const NoCards = () => (
  <div style={{
    ...theme.center,
    width: '80%'
  }}>
    <h1 className={css(styles.noCardsTitleStyles)}>I am awaiting your instructions</h1>
  </div>
);

const Card = (cardContainer, registerCard, unRegisterCard) => {
  const C = pluginManager.resolveComponent(cardContainer.card)

  if (!C) {
    return null
  }

  const props = {
    ...cardContainer.props,
    __CARD_ID__: cardContainer.id
  };

  const isFunctional = isFunctionalComponent(C)

  return (
    <div key={cardContainer.id}>
      <RestorableComponent
        key={cardContainer.id}
        Component={C}
        componentProps={props}
        cardContainer={cardContainer}
        isFunctional={isFunctional}
        registerCard={registerCard}
        unRegisterCard={unRegisterCard}
      />
    </div>
  )
};

const Main = React.createClass({
  getDefaultProps() {
    return {
      saveCardStates: () => {} // NOOP
    }
  },
  componentWillMount() {
    this.cards = []
  },
  componentDidMount() {
    this.saveComponentStates()
  },
  componentWillUnmount() {
    cancelAnimationFrame(this._retrieveState)
  },
  registerCard(id, {getState}) {
    this.cards = [
      ...this.cards,
      {
        id,
        getState,
      }
    ]
  },
  saveComponentStates() {
    setTimeout(() => {
      this._retrieveState = requestAnimationFrame(() => {
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
    }, 5000) // Every 5 seconds
  },
  unRegisterCard(id) {
    this.cards = this.cards.filter(c => c.id !== id)
  },
  render() {
    let {cards} = this.props

    cards = cards.map((c) => Card(c, this.registerCard, this.unRegisterCard)).filter(c => c !== null)

    return (
      <div className={css(styles.cardsStyles)}>
        {cards.length > 0 ? cards : NoCards()}
      </div>
    )
  }
});

export default Main
