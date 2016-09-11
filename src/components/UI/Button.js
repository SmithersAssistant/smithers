import React from 'react'
import styles from './ButtonStyles'
import TouchRipple from 'material-ui/internal/TouchRipple'
import {withStyles, classNames} from 'components/functions'
import {getPrimaryColor} from 'state'

export const ButtonColors = {
  AMBER: 'amber',
  BLUE_GREY: 'blueGrey',
  BLUE_GRAY: 'blueGray',
  BLUE: 'blue',
  BROWN: 'brown',
  CYAN: 'cyan',
  DEEP_ORANGE: 'deepOrange',
  DEEP_PURPLE: 'deepPurple',
  GREEN: 'green',
  GREY: 'grey',
  GRAY: 'gray',
  INDIGO: 'indigo',
  LIGHT_BLUE: 'lightBlue',
  LIGHT_GREEN: 'lightGreen',
  LIME: 'lime',
  ORANGE: 'orange',
  PINK: 'pink',
  PURPLE: 'purple',
  RED: 'red',
  TEAL: 'teal',
  YELLOW: 'yellow'
}

const Button = ({styles, color = getPrimaryColor(), className, children, ...other}) => {
  return (
    <button
      {...other}
      className={classNames(styles.button, styles[`buttonColor_${color}`], className)}
    >
      <TouchRipple>{children}</TouchRipple>
    </button>
  )
}

export default withStyles(styles)(Button)
