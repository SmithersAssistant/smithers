import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'
import { areTabsVisible } from 'state'

const Full = ({children, styles, className, title, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(
      styles.card,
      styles.item,
      areTabsVisible()
        ? styles.cardFullWithTabs
        : styles.cardFullWithoutTabs,
      className
    )}
  >
    <div className={styles.embed}>
      {children}
    </div>
  </Base>
)

export default withStyles(styles)(Full)
