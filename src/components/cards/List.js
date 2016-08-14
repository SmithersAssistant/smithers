import React from 'react'
import Base from './Base'
import {theme} from 'styles/theme'
import {cardStyles, itemStyles} from './_styles'

const cardListStyles = {
  display: 'block',
  listStyleType: 'none',
  padding: 0,
  margin: '0.5rem 0 1rem 0',
  borderRadius: 2,
  ...theme.shadow1
}

const cardListItemStyles = {
  backgroundColor: 'white',
  lineHeight: '1.9rem',
  padding: '10px 20px',
  margin: 0,
  borderBottom: '1px solid #e0e0e0'
}

const List = ({title, items, ...other}) => (
  <Base {...other} title={title} style={{...cardStyles, ...itemStyles}}>
    <ul style={cardListStyles}>
      {items.map((item, i) => (
        item && <li key={i} style={cardListItemStyles}>{item}</li>
      ))}
    </ul>
  </Base>
)

export default List
