import React from 'react'
import Toolbar from '../Toolbar'

const Base = ({__CARD_ID__, removeCard, children, title, actions, ...other}) => {
  let card;

  return (
    <div {...other} ref={component => card = component}>
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
