import React from 'react'
import pluginManager from 'pluginSystem/pluginManager'

import {dispatch} from 'store'
import {removeCard, saveCardState} from 'actions/index'
import Event, {OPEN_HELP} from 'Event'
import {withStyles} from 'components/functions'
import {getStateForCard} from 'state'

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

const Card = (cardContainer) => {
  const Component = pluginManager.resolveComponent(cardContainer.card)

  if (!Component) {
    return null
  }

  const ID = cardContainer.id

  return (
    <div key={ID}>
      <Component
        {...cardContainer.props}
        removeCard={() => dispatch(removeCard(ID))}
        getState={() => getStateForCard(ID)}
        setState={(state) => dispatch(saveCardState(ID, state))}
      />
    </div>
  )
}

const Main = React.createClass({
  render () {
    let {cards, styles} = this.props

    cards = cards.map((c) => Card(c)).filter(c => c !== null)

    return (
      <div className={styles.cardsStyles}>
        {
          cards.length > 0
            ? cards
            : NoCards()
        }
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
