import React from 'react'

import Button from 'components/UI/Button'
import Icon from 'components/UI/Icon'
import styles from './ToolsStyles'
import {css} from 'aphrodite'

let Tools = ({canClear, clear}) => (
  <div className={css(styles.toolbar)}>
    <Button disabled={ ! canClear} onClick={() => clear()}>
      <Icon icon="trash-o"/> Clear
    </Button>
  </div>
);

export default Tools
