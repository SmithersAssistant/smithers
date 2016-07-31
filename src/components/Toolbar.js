import React from 'react'
import {StyleSheet, css} from 'aphrodite'

import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import {Menu, MenuItem, MenuDivider} from './UI/Menu'

import {theme, sum, px} from 'styles/theme'

const Toolbar = ({title, actions, removeCard}) => {
  const styles = StyleSheet.create({
    cardHeaderStyles: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      paddingLeft: theme.cardHeaderPaddingLeft,
      borderBottom: '1px solid whitesmoke',
      borderRadius: '3px 3px 0 0',
      backgroundColor: theme.cardBackground
    },
    cardHeaderTitleStyles: {
      height: px(theme.cardHeaderHeight),
      lineHeight: px(theme.cardHeaderHeight),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: `calc(100vw - ${px(sum(
        (theme.cardHeaderHeight * 1), // Space for 1 icon-button(s) on the right side
        theme.cardHeaderPaddingLeft, // Padding on the left, should also be on the right
        (2 * theme.cardSpace), // padding for both sides
        10 // the width of the scrollbar
      ))})`,
      ...theme.left
    }
  })

  return (
    <div className={css(styles.cardHeaderStyles)}>

      { title && <h3 className={css(styles.cardHeaderTitleStyles)}>{title}</h3>}

      <Menu style={theme.right} icon={ExpandMoreIcon}>
        <MenuItem onClick={() => removeCard()}>Remove card</MenuItem>

        {actions && actions.length > 0 && actions.map(({type, label, ...other}, i) => {
          if (type === 'divider') {
            return (<MenuDivider key={i}/>)
          }

          return (<MenuItem key={i} {...other}>{label}</MenuItem>)
        })}
      </Menu>
    </div>
  )
}

export default Toolbar
