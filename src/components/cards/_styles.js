import {theme, sum, px} from 'styles/theme'

export const cardStyles = {
  position: 'relative',
  backgroundColor: theme.cardBackground,
  borderRadius: 3,
  overflow: 'hidden',
  padding: [sum(theme.cardHeaderHeight, theme.padding), theme.padding, theme.padding].map(i => `${i}px`).join(' '),
  ...theme.shadow2
}

export const itemStyles = {
  margin: px(0, theme.cardSpace, theme.cardSpace)
}
