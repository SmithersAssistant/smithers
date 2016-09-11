import React from 'react'
import styles from './stateViewerStyles'
import {withStyles} from 'components/functions'
import {STATE_PENDING, STATE_BUSY, STATE_DONE, STATE_FAILED} from './states'

export default withStyles(styles)(({styles, robot, state, children}) => {
  const {Icon} = robot.UI

  const icon = {
    [STATE_PENDING]: 'ellipsis-h',
    [STATE_BUSY]: 'clock-o',
    [STATE_DONE]: 'check',
    [STATE_FAILED]: 'times'
  }

  return (
    <span>
      <Icon
        className={styles[`${state}_icon`]}
        icon={icon[state]}
      />
      <span className={styles[`${state}_value`]}>{children}</span>
    </span>
  )
})
