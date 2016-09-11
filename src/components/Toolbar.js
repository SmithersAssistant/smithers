import React from 'react'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import {Menu, MenuItem, MenuDivider} from './UI/Menu'
import styles from './ToolbarStyles'
import {withStyles} from 'components/functions'

const Toolbar = ({styles, title, actions, removeCard}) => {
  return (
    <div className={styles.cardHeaderStyles}>

      {title && <h3 className={styles.cardHeaderTitleStyles}>{title}</h3>}

      <Menu className={styles.right} icon={ExpandMoreIcon}>
        <MenuItem onClick={() => removeCard()}>Remove card</MenuItem>

        {actions && actions.length > 0 && actions.map(({type, label, ...other}, i) => {
          if (type === 'divider') {
            return (<MenuDivider key={i} />)
          }

          return (<MenuItem key={i} {...other}>{label}</MenuItem>)
        })}
      </Menu>
    </div>
  )
}

export default withStyles(styles)(Toolbar)
