import React from 'react'
import {css} from 'aphrodite'
// import themeFactory  from '../../styles/theme'
import cx from 'classnames'
import styles from './ButtonStyles'
import TouchRipple from 'material-ui/internal/TouchRipple'

export const ButtonColors = {
  THEME: '__THEME__',
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

const Button = ({color = ButtonColors.THEME, children, className, ...other}) => (
  <button {...other} className={cx({
      [`${css(styles().button)}`]: true,
      [`${css(styles(color === ButtonColors.THEME ? 'themeFactory().colorTheme' : color).buttonColor)}`]: true,
      [className]: className != undefined
  })}>
    <TouchRipple>{children}</TouchRipple>
  </button>
)

export default Button
