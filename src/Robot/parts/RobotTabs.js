import {dispatch} from 'store'
import {
  addTab,
  editTab,
  hideTabs,
  showTabs,
  removeTab,
  removeTabsToTheLeft,
  removeTabsToTheRight,
  removeOtherTabs,
  moveTabToTheLeft,
  moveTabToTheRight,
  focusPrevTab,
  focusNextTab
} from 'actions/index'

export default {
  // Tabs
  addTab: (title) => dispatch(addTab(title)),
  editTab: (title) => dispatch(editTab(title)),
  hideTabs: () => dispatch(hideTabs()),
  showTabs: () => dispatch(showTabs()),
  removeTab: () => dispatch(removeTab()),
  removeTabsToTheLeft: () => removeTabsToTheLeft(),
  removeTabsToTheRight: () => removeTabsToTheRight(),
  removeOtherTabs: () => removeOtherTabs(),
  moveTabToTheLeft: () => dispatch(moveTabToTheLeft()),
  moveTabToTheRight: () => dispatch(moveTabToTheRight()),
  focusPrevTab: (places = 1) => dispatch(focusPrevTab(places)),
  focusNextTab: (places = 1) => dispatch(focusNextTab(places))
}
