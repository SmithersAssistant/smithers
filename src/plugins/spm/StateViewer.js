import React from 'react'
import stateViewerStyles from './StateViewerStyles'

export default (RobotUI, {STATE_PENDING, STATE_BUSY, STATE_DONE, STATE_FAILED}) => {
  const {Icon, css} = RobotUI
  const styles = stateViewerStyles(RobotUI, {STATE_PENDING, STATE_BUSY, STATE_DONE, STATE_FAILED})

  const StateViewer = ({state, children}) => {
    const icon = {
      [STATE_PENDING]: 'ellipsis-h',
      [STATE_BUSY]: 'clock-o',
      [STATE_DONE]: 'check',
      [STATE_FAILED]: 'times'
    }

    return (
      <span>
        <Icon
          className={css(styles[`${state}_icon`])}
          icon={icon[state]}
        />
        <span className={css(styles[`${state}_value`])}>{children}</span>
      </span>
    )
  }

  return StateViewer
}
