import {theme} from 'styles/theme'
import {StyleSheet} from 'aphrodite'

export default StyleSheet.create({
  tabs: {
    borderTop: 'none',
    backgroundColor: 'white',
    borderBottom: '1px solid whitesmoke',
    height: theme.tabHeight + 1
  },
  tabsInBar: {
    position: 'absolute',
    top: 0,
    left: 120,
    right: 96
  },
  nestedTabs: {
    marginTop: 1
  },
  tab: {
    backgroundColor: 'white'
  },
  tabActive: {
    borderBottom: '2px solid black'
  },
  a: {
    color: 'rgba(0, 0, 0, .7)'
  },
  aActive: {
    color: 'black'
  },
  saveButtonStyles: {
    position: 'absolute',
    right: 48,
    top: 0
  }
})
