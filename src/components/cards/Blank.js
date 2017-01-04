import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const Blank = ({styles, children, title, className, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.card, styles.item, className)}
  >
    {children}
  </Base>
)

export default withStyles(styles)(Blank)
