import React from 'react'
import Toolbar from '../Toolbar'
import {deleteProps} from 'components/functions'

const Base = ({ canShareCard, shareCard, removeCard, children, title, actions, ...other }) => {
  const props = deleteProps(other, [
    'getState', 'setState'
  ])

  return (
    <div {...props}>
      <Toolbar
        title={title}
        actions={actions}
        removeCard={removeCard}
        shareCard={shareCard}
        canShareCard={canShareCard}
      />
      {children}
    </div>
  )
}

export default Base
