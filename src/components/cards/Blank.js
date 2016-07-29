import React from 'react'
import Base from './Base'
import {cardStyles, itemStyles} from './_styles'

const Blank = ({children, title, style = {}, ...other}) => (
  <Base {...other} title={title} style={{...cardStyles, ...itemStyles, ...style}}>
    {children}
  </Base>
);

export default Blank
