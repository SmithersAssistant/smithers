import React from 'react'
import cx from 'classnames'
import {css} from 'aphrodite'
import styles from './CollectionStyles'

export const Collection = ({className = false, ...other}) => (
  <ul {...other} className={cx({
    [css(styles.collectionStyles)]: true,
    [className]: className
  })}/>
)

export const CollectionItem = ({className = false, ...other}) => (
  <li {...other} className={cx({
    [css(styles.collectionItemStyles)]: true,
    [className]: className
  })}/>
)

export default Collection
