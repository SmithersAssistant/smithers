import pluginManager from 'pluginSystem/pluginManager'

import {dispatch} from 'store'
import {addCard, removeCard} from 'actions/index'

// Cards
import Blank from 'components/cards/Blank'
import Empty from 'components/cards/Empty'
import Full from 'components/cards/Full'
import Images from 'components/cards/Images'
import List from 'components/cards/List'
import Table from 'components/cards/Table'

export default {
  addCard: (card, props = {}) => dispatch(addCard(card, props)),
  removeCard: (id) => dispatch(removeCard(id)),
  registerComponent(component, name) {
    pluginManager.registerComponent(component, name)
  },
  cards: {
    Blank,
    Empty,
    Full,
    Images,
    List,
    Table
  }
}
