import React from 'react'

import Button from 'components/UI/Button'
import Icon from 'components/UI/Icon'
import styles from './ToolsStyles'
import {withStyles, classNames} from 'components/functions'

let Tools = ({styles, canClear, clear, activeCards, className}) => (
  <div className={classNames(styles.toolbar, className)}>
    <Button disabled={!canClear} onClick={() => clear()}>
      <Icon icon='trash-o' /> Clear
    </Button>
    <span className={styles.info}>There {activeCards === 1 ? 'is' : 'are'} {activeCards} card{activeCards === 1 ? '' : 's'} active</span>
  </div>
)

export default withStyles(styles)(Tools)
