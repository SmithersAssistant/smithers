import { ButtonColors } from './Button'

export default ({ theme, color }) => {
  const styles = {
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
    }
  }

  Object.values(ButtonColors).forEach(c => {
    styles[`buttonColor_${c}`] = {
      backgroundColor: color(c, 800),
      ':focus': {
        backgroundColor: color(c, 600)
      },
      ':hover': {
        backgroundColor: color(c, 600)
      }
    }
  })

  return styles
}
