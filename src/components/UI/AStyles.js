import {StyleSheet} from 'aphrodite'
import {theme, color} from 'styles/theme'

export default () => StyleSheet.create({
  a: {
    color: color(theme.primaryColor, 500),
    textDecoration: 'none',
    ':hover': {
      color: color(theme.primaryColor, 300),
      textDecoration: 'none'
    }
  }
})
