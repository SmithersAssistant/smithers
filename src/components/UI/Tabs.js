import React from 'react'
import cx from 'classnames'
import {css} from 'aphrodite'
import {deleteProps} from '../functions'
import styles from './TabsStyles'
import {TabHolder, SortableItem} from './Tab'
import flatten from 'lodash/flatten'

import {SortableContainer} from 'react-sortable-hoc'

const noop = () => null

const TabsHolder = ({externalStyles, headers, ...rest}) => {
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
      className={css(...flatten([styles.tabsBar, externalStyles]))}
    >{headers}</ul>
  )
}

const SortableList = SortableContainer((props) => (<TabsHolder {...props} />))

export const Tabs = React.createClass({
  getDefaultProps() {
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
  
  onClick(i, tab) {
    if (i !== this.props.selectedIndex) {
      if (tab.props.onActive) tab.props.onActive(tab)
    }
  },

  render() {
    let {
      disableSorting,
      children,
      selectedIndex,
      onSortStart,
      onSortMove,
      onSortEnd,
      pressDelay,
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

      this.pushedTabs = this.pushedTabs || []
      const hasBeenPushed = this.pushedTabs.includes(`tab-${i}`)

      if (isActive || hasBeenPushed) {
        panels.push(
          <div key={i} className={cx({
            [css(styles.tabsPane)]: true,
            [css(styles.tabsPaneActive)]: isActive
          })}>
            {item}
          </div>
        )

        if (!hasBeenPushed) {
          this.pushedTabs = [...this.pushedTabs, `tab-${i}`]
        }
      }
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
            axis="x"
            lockAxis="x"
            helperClass={css(styles.tab)}
          />
        )}
        {panels}
      </div>
    )
  }
});
