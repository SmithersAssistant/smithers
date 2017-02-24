import React from 'react'
import styles from './AppStyles'

import Navbar from './layout/NavbarContainer'
import Tools from './layout/ToolsContainer'
import Tabs from './layout/TabsContainer'

import store from 'store'
import {areTabsVisible} from 'state'
import {withStyles, classNames} from 'components/functions'

class App extends React.Component {
  state = {
    visibleTabs: areTabsVisible()
  };

  componentDidMount () {
    this._unsubscribe = store.subscribe(() => {
      this.setState({ visibleTabs: areTabsVisible() })
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  render () {
    let {styles} = this.props
    let {visibleTabs} = this.state

    return (
      <div className={styles.body}>
        <Navbar />
        <div className={classNames(styles.content, visibleTabs ? undefined : styles.scrollBar)}>
          <Tabs />
        </div>
        <Tools />
      </div>
    )
  }
}

export default withStyles(styles)(App)
