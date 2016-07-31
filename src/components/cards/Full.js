import React from 'react'
import Base from './Base'
import {theme, sum, px} from 'styles/theme'
import {cardStyles, itemStyles} from './_styles'
import {areTabsVisible} from 'stateHelpers'

const calculateFullCardHeight = () => {
  return sum(
    theme.inputHeight,
    theme.headerOffset,
    (areTabsVisible() ? theme.tabHeight : 0),
    sum(theme.cardSpace, theme.cardSpace, 0, 0), // top right bottom left
    theme.footerHeight
  )
}

const cardFulStyles = () => ({
  position: 'relative',
  height: `calc(100vh - ${px(calculateFullCardHeight())})`
})

const embedStyles = {
  padding: 0,
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: theme.cardHeaderHeight
}

const getCardStyles = () => {
  return {
    ...cardStyles,
    ...itemStyles,
    ...cardFulStyles()
  }
}

const Full = ({children, title, ...other}) => (
  <Base {...other} title={title} style={getCardStyles()}>
    <div style={embedStyles}>
      {children}
    </div>
  </Base>
);

export default Full
