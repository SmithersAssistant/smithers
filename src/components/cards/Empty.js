import React from 'react'
import Base from './Base'
import {itemStyles} from './_styles'

const Empty = ({children, title, ...other}) => (
  <Base {...other} title={title} style={itemStyles}>
    {children}
  </Base>
);

export default Empty
