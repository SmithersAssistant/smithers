import React from 'react'

import Button from 'components/UI/Button'
import Icon from 'components/UI/Icon'
import styles from './ToolsStyles'
import {css} from 'aphrodite'

let Tools = ({canClear, clear, activeCards}) => (
  <div className={css(styles.toolbar)}>
    <Button disabled={! canClear} onClick={() => clear()}>
      <Icon icon="trash-o"/> Clear
    </Button>
    <span className={css(styles.info)}>There {activeCards === 1 ? 'is' : 'are'} {activeCards} card{activeCards === 1 ? '' : 's'} active</span>
  </div>
);

export default Tools
