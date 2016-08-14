// Dependencies
import {connect} from 'react-redux'
import Event, {FOCUS_INPUT, PUT_INPUT} from 'Event'
import debounce from 'lodash/debounce'

// Actions
import {
  addTab,
  saveCardStates,
  removeTab,
  removeTabsToTheLeft,
  removeTabsToTheRight,
  removeOtherTabs,
  focusTab,
  moveTab
} from '../../actions/index'

// Component
import Tabs from './Tabs'

const attachRelationsToTabs = (tabs, cards = []) => tabs.map(tab => ({
  ...tab,
  cards: cards.filter(card => card.relation == tab.id)
}))

const findActiveTab = ({list, active}) => {
  return list.findIndex(tab => tab.id == active)
}

const focusInput = debounce(() => {
  Event.fire(FOCUS_INPUT)
}, 200)

const canTabs = (tabs) => {
  return tabs.map((tab, index) => {
    return {
      ...tab,
      canClose: true,
      canCloseOthers: true,
      canCloseToTheLeft: !(index == 0), // Nope, if the first tab
      canCloseToTheRight: !(index == tabs.length - 1) // Nope, if the last tab
    }
  })
}

const mapStateToProps = (state) => ({
  tabsAreVisible: state.tabs.visible,
  cards: state.tabs.visible ? [] : state.cards.cards,
  tabs: !state.tabs.visible ? [] : canTabs(attachRelationsToTabs(state.tabs.list, state.cards.cards)),
  activeTab: !state.tabs.visible ? null : findActiveTab(state.tabs)
})

const mapDispatchToProps = (dispatch) => ({
  activateTab: (id) => {
    dispatch(focusTab(id))
    focusInput()
  },
  addTab: () => dispatch(addTab()),
  saveCardStates: (data) => dispatch(saveCardStates(data)),
  removeTab: (id) => dispatch(removeTab(id)),
  removeTabsToTheLeft: (id) => removeTabsToTheLeft(id),
  removeTabsToTheRight: (id) => removeTabsToTheRight(id),
  removeOtherTabs: (id) => removeOtherTabs(id),
  focusInput: () => focusInput(),
  editTab: (tabText) => Event.fire(PUT_INPUT, {
    text: `edit tab ${tabText}`,
    selectStart: 'edit tab '.length,
    selectEnd: `edit tab ${tabText}`.length
  }),
  onSortEnd: ({oldIndex, newIndex}) => dispatch(moveTab(oldIndex, newIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs)
