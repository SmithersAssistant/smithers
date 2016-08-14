import {StyleSheet} from 'aphrodite'
import {color} from 'styles/theme'

export default StyleSheet.create({
  info: {
    fontSize: 12,
    float: 'right',
    color: color('grey')
  },
  pluginItem: {
    position: 'relative'
  },
  removePluginButton: {
    position: 'absolute',
    top: 0,
    right: 65
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
})
