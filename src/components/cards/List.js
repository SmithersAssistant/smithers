import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const List = ({title, items, className, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.cardStyles, styles.itemStyles, className)}
  >
    <ul className={styles.cardListStyles}>
      {items.map((item, i) => (
        item && <li key={i} className={styles.cardListItemStyles}>{item}</li>
      ))}
    </ul>
  </Base>
)

export default withStyles(styles)(List)
