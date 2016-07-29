import {StyleSheet} from 'aphrodite'
import themeFactory, {color} from 'styles/theme'

export default () => StyleSheet.create({
  a: {
    color: color(themeFactory().colorTheme, 500),
    textDecoration: 'none',
    ':hover': {
      color: color(themeFactory().colorTheme, 300),
      textDecoration: 'none'
    }
  }
})
