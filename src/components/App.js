import React from 'react';
import {css} from 'aphrodite';
import styles from './AppStyles';

import Navbar from './layout/NavbarContainer';
import Tools from './layout/ToolsContainer';
import Tabs from './layout/TabsContainer';

import store, {getState} from 'store';

export default React.createClass({
  getInitialState() {
    return {
      visibleTabs: getState().tabs.visible
    }
  },
  componentDidMount() {
    this._unsubscribe = store.subscribe(() => {
      this.setState({ visibleTabs: getState().tabs.visible });
    });
  },
  componentWillUnmount() {
    this._unsubscribe()
  },
  render() {
    let {visibleTabs} = this.state;

    return (
      <div className={css(styles.bodyStyles)}>
        <Navbar/>
        <div className={css(styles.contentStyles, visibleTabs ? undefined : styles.scrollBar)}>
          <Tabs/>
        </div>
        <Tools/>
      </div>
    )
  }
})
