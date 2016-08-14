import {StyleSheet} from 'aphrodite'
import {
  theme,
  color
} from 'styles/theme'

export default c => StyleSheet.create({
  button: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    color: 'white',
    padding: '8px 15px',
    ...theme.shadow1,
    ':hover': {
      color: 'whitesmoke'
    },
    ':active': {
      color: 'whitesmoke'
    },
    ':disabled': {
      backgroundColor: color('grey', 400),
      color: color('grey', 900),
      cursor: 'not-allowed'
    },
    ':disabled:hover': {
      backgroundColor: color('grey', 400),
      color: color('grey', 900),
      cursor: 'not-allowed'
    }
  },
  buttonColor: {
    backgroundColor: color(c, 800),
    ':focus': {
      backgroundColor: color(c, 600)
    },
    ':hover': {
      backgroundColor: color(c, 600)
    }
  }
})
