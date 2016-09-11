import React from 'react'
import {SortableElement} from 'react-sortable-hoc'
import styles from './TabStyles'
import {withStyles, classNames, deleteProps} from 'components/functions'

export const TabHolder = withStyles(styles)(({
  externalStyles,
  externalStylesActive,
  externalAnchorStyles,
  externalAnchorStylesActive,
  item,
  isActive,
  onClick,
  scrollIntoView = false,
  styles,
  className,
  ...other
}) => {
  const otherProps = deleteProps(other, [
    'onActive', 'index', 'collection', 'scrollIntoView'
  ])

  return (
    <li
      ref={e => scrollIntoView ? (e !== null && isActive ? e.scrollIntoView({block: 'end', behavior: 'smooth'}) : null) : null}
      {...otherProps}
      className={classNames(
        styles.tab, isActive ? styles.tabActive : undefined,
        externalStyles,
        externalStylesActive !== undefined && isActive ? externalStylesActive : undefined,
        className
      )}
    >
      <a
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onClick(e)
          return false
        }}
        href='#'
        className={classNames(
          styles.a,
          isActive ? styles.aActive : undefined,
          externalAnchorStyles,
          isActive ? externalAnchorStylesActive : undefined
        )}
      >{item.props.label}</a>
    </li>
  )
})

export const SortableItem = SortableElement((props) => <TabHolder {...props} />)

export const Tab = ({children}) => (
  <div>{children}</div>
)
