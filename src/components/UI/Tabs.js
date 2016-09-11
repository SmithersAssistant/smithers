import React from 'react'
import styles from './TabsStyles'
import {TabHolder, SortableItem} from './Tab'
import {withStyles, classNames, deleteProps} from 'components/functions'

import {SortableContainer} from 'react-sortable-hoc'

const noop = () => null

const TabsHolder = withStyles(styles)(({externalStyles, styles, headers, ...rest}) => {
  const other = deleteProps(rest, [
    'onActive', 'onSortEnd', 'onSortMove', 'onSortStart',
    'pressDelay', 'lockToContainerEdges', 'axis', 'lockAxis',
    'helperClass', 'transitionDuration', 'useWindowAsScrollContainer',
    'hideSortableGhost', 'contentWindow', 'sorting', 'sortingIndex',
    'lockOffset'
  ])

  return (
    <ul
      {...other}
      className={classNames(styles.tabsBar, externalStyles)}
    >{headers}</ul>
  )
})

const SortableList = SortableContainer((props) => (<TabsHolder {...props} />))

export const Tabs = withStyles(styles)(React.createClass({
  getDefaultProps () {
    return {
      onActive: noop,
      onSortStart: noop,
      onSortMove: noop,
      onSortEnd: noop,
      selectedIndex: 0,
      pressDelay: 120,
      disableSorting: false
    }
  },

  onClick (i, tab) {
    if (i !== this.props.selectedIndex) {
      if (tab.props.onActive) tab.props.onActive(tab)
    }
  },

  render () {
    let {
      disableSorting,
      children,
      selectedIndex,
      onSortStart,
      onSortMove,
      onSortEnd,
      pressDelay,
      styles,
      ...other
    } = this.props
    let headers = []
    let panels = []

    for (var i = 0; i < children.length; i++) {
      let item = children[i]
      let isActive = i === selectedIndex

      headers.push(
        item.disableSorting || disableSorting ? (
          <TabHolder
            key={`tab-${i}`}
            item={item}
            isActive={isActive}
            onClick={() => this.onClick(i, item)}
            {...item.props}
          />
        ) : (
          <SortableItem
            key={`tab-${i}`}
            index={i}
            item={item}
            isActive={isActive}
            onClick={() => this.onClick(i, item)}
            {...item.props}
          />
        )
      )

      panels.push(
        <div
          key={i}
          className={classNames(styles.tabsPane, isActive ? styles.tabsPaneActive : undefined)}
        >
          {item}
        </div>
      )
    }

    return (
      <div>
        {disableSorting ? (
          <TabsHolder
            {...other}
            headers={headers}
          />
        ) : (
          <SortableList
            {...other}
            onSortEnd={onSortEnd}
            onSortMove={onSortMove}
            onSortStart={onSortStart}
            pressDelay={pressDelay}
            headers={headers}
            lockToContainerEdges
            axis='x'
            lockAxis='x'
            helperClass={styles.tab}
          />
        )}
        {panels}
      </div>
    )
  }
}))
