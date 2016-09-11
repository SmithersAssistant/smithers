import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const Empty = ({children, title, className, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.itemStyles, className)}
  >
    {children}
  </Base>
)

export default withStyles(styles)(Empty)
