import React from 'react'
import {css} from 'aphrodite'
import {deleteProps} from '../functions'
import {SortableElement} from 'react-sortable-hoc'
import styleFactory from './TabStyles'
import flatten from 'lodash/flatten'

export const TabHolder = ({
  externalStyles,
  externalStylesActive,
  externalAnchorStyles,
  externalAnchorStylesActive,
  item,
  isActive,
  onClick,
  scrollIntoView = false,
  ...other
}) => {
  const otherProps = deleteProps(other, [
    'onActive', 'index', 'collection', 'scrollIntoView'
  ])

  const styles = styleFactory()

  return (
    <li
      ref={e => scrollIntoView ? (e != null && isActive ? e.scrollIntoView({ block: 'end', behavior: 'smooth'}) : null) : null}
      {...otherProps}
      className={css(...flatten([
        styles.tab,
        isActive ? styles.tabActive : undefined,
        externalStyles != undefined ? externalStyles : undefined,
        externalStylesActive != undefined && isActive ? externalStylesActive : undefined
      ]))}
    >
      <a
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onClick(e)
          return false
        }}
        href="#"
        className={css(...flatten([
          styles.a,
          isActive ? styles.aActive : undefined,
          externalAnchorStyles,
          isActive ? externalAnchorStylesActive : undefined
        ]))}
      >{item.props.label}</a>
    </li>
  )
}

export const SortableItem = SortableElement((props) => <TabHolder {...props}/>)

export const Tab = ({children}) => (
  <div>{children}</div>
)
