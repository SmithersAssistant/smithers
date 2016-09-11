import React from 'react'
import Toolbar from '../Toolbar'

const Base = ({ removeCard, children, title, actions, ...other }) => {
  return (
    <div {...other}>
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
