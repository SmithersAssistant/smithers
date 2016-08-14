import {StyleSheet} from 'aphrodite'
import {theme, px} from 'styles/theme'

export default StyleSheet.create({
  outputStyles: {
    width: '100%',
    height: `calc(100vh - ${px(theme.inputHeight + theme.headerOffset + theme.tabHeight + theme.footerHeight)})`,
    position: 'relative',
    ...theme.scrollBar
  }
})
