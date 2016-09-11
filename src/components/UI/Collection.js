import React from 'react'
import {withStyles, classNames} from 'components/functions'
import styles from './CollectionStyles'

const styleMe = withStyles(styles)

export const Collection = styleMe(({styles, className = false, ...other}) => (
  <ul
    {...other}
    className={classNames(styles.collectionStyles, className)}
  />
))

export const CollectionItem = styleMe(({styles, className = false, scrollIntoView = false, ...other}) => (
  <li
    {...other}
    ref={e => e !== null && scrollIntoView ? e.scrollIntoView(false) : null}
    className={classNames(styles.collectionItemStyles, className)}
  />
))

export default Collection
