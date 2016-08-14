import React from 'react'
import cx from 'classnames'
import {css} from 'aphrodite'
import styles from './CollectionStyles'
import flatten from 'lodash/flatten'

const styleMerger = (...styles) => {
  return css(...flatten(styles))
}

export const Collection = ({externalStyles, className = false, ...other}) => (
  <ul {...other} className={cx({
    [styleMerger(styles.collectionStyles, externalStyles)]: true,
    [className]: className
  })} />
)

export const CollectionItem = ({externalStyles, className = false, scrollIntoView = false, ...other}) => (
  <li
    {...other}
    ref={e => e !== null && scrollIntoView ? e.scrollIntoView(false) : null}
    className={cx({
      [styleMerger(styles.collectionItemStyles, externalStyles)]: true,
      [className]: className
    })} />
)

export default Collection
