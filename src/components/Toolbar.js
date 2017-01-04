import React from 'react'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import { Menu, MenuItem, MenuDivider } from './UI/Menu'
import styles from './ToolbarStyles'
import { withStyles } from 'components/functions'

const Actions = ({ actions = [] }) => {
  const DIVIDER = 'divider'
  const hasActions = actions && actions.length > 0

  return (
    <div>
      {hasActions && actions.map(({ type, label, ...other }, i) => {
        if (type === DIVIDER) {
          return <MenuDivider key={i} />
        }

        return <MenuItem key={i} {...other}>{label}</MenuItem>
      })}
    </div>
  )
}

const Toolbar = ({ styles, title, actions, removeCard, canShareCard, shareCard }) => {
  const hasActions = actions && actions.length > 0
  const hasTitle = title && title !== undefined

  return (
    <div className={styles.cardHeader}>
      {/* Render a title if there is one */}
      {hasTitle && <h3 className={styles.cardHeaderTitle}>{title}</h3>}

      {/* Render the menu dropdown itself */}
      <Menu className={styles.right} icon={ExpandMoreIcon}>
        {/* Render all actions from the plugin */}
        <Actions actions={actions} />

        {/* Render a divider if the plugin has actions */}
        {hasActions && <MenuDivider />}

        {/* Render default actions */}
        <MenuItem disabled={!canShareCard} onClick={() => canShareCard && shareCard()}>Share card</MenuItem>
        <MenuItem onClick={removeCard}>Remove card</MenuItem>
      </Menu>
    </div>
  )
}

export default withStyles(styles)(Toolbar)
