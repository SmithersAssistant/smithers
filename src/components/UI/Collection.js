import React from 'react'
import cx from 'classnames'
import {css} from 'aphrodite'
import styles from './CollectionStyles'
import flatten from 'lodash/flatten'

export const Collection = ({externalStyles, className = false, ...other}) => (
  <ul {...other} className={cx({
    [css(...flatten([
      styles.collectionStyles,
      externalStyles
    ]))]: true,
    [className]: className
  })} />
)

export const CollectionItem = ({externalStyles, className = false, scrollIntoView = false, ...other}) => (
  <li
    {...other}
    ref={e => e !== null && scrollIntoView ? e.scrollIntoView(false) : null}
    className={cx({
      [css(...flatten([
        styles.collectionItemStyles,
        externalStyles
      ]))]: true,
      [className]: className
    })} />
)

export default Collection
