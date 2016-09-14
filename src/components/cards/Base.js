import React from 'react'
import Toolbar from '../Toolbar'
import {deleteProps} from 'components/functions'

const Base = ({ removeCard, children, title, actions, ...other }) => {
  const props = deleteProps(other, [
    'getState', 'setState'
  ])

  return (
    <div {...props}>
      <Toolbar
        title={title}
        actions={actions}
        removeCard={removeCard}
      />
      {children}
    </div>
  )
}

export default Base
