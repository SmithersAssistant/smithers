import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const List = ({title, items, styles, className, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.card, styles.item, className)}
  >
    <ul className={styles.cardList}>
      {items.map((item, i) => (
        item && <li key={i} className={styles.cardListItem}>{item}</li>
      ))}
    </ul>
  </Base>
)

export default withStyles(styles)(List)
