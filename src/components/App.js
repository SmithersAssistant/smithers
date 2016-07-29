import React from 'react';
import {css} from 'aphrodite';
import styles from './AppStyles';

import Navbar from './layout/NavbarContainer';
import Tools from './layout/ToolsContainer';
import Tabs from './layout/TabsContainer';

import {getState} from 'store';

export default () => (
  <div className={css(styles.bodyStyles)}>
    <Navbar/>
    <div className={css(styles.contentStyles, getState().tabs.visible ? undefined : styles.scrollBar)}>
      <Tabs/>
    </div>
    <Tools/>
  </div>
)
