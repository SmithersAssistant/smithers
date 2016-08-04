import React from 'react';
import {css} from 'aphrodite';
import styles from './AppStyles';

import Navbar from './layout/NavbarContainer';
import Tools from './layout/ToolsContainer';
import Tabs from './layout/TabsContainer';

import store from 'store';
import {areTabsVisible} from 'state';

export default React.createClass({
  getInitialState() {
    return {
      visibleTabs: areTabsVisible()
    }
  },
  componentDidMount() {
    this._unsubscribe = store.subscribe(() => {
      this.setState({ visibleTabs: areTabsVisible() });
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
