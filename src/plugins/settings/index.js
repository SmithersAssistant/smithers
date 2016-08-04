import React from 'react'
import {remote} from 'electron'
const {app, getCurrentWindow} = remote
import {StyleSheet, css} from 'aphrodite'
import styles from './indexStyles'

import IconButton from 'material-ui/IconButton/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';

// Pages
import generalPage from './GeneralPage'
import themePage from './ThemePage'
import pluginsPage from './PluginsPage'

const SETTINGS_COMPONENT = 'com.robinmalfait.settings';

export default robot => {

  const {Full} = robot.cards
  const {
    theme,

    Tabs,
    Tab,
  } = robot.UI


  const GeneralPage = generalPage(robot);
  const ThemePage = themePage(robot);
  const PluginsPage = pluginsPage(robot);

  const restart = () => {
    app.relaunch();
    app.quit();
  };

  const Settings = React.createClass({
    getInitialState() {
      return {
        activePage: 0,
        generalPageState: {
          checking_for_updates: false,
          update_available: false,
          update_downloaded: false,
          downloading_updates: false
        },
        themePageState: {
          activeColor: theme.colorTheme
        },
        pluginsPageState: {
          activeTab: 0
        }
      }
    },
    pages() {
      return [{
        label: 'General',
        body: (
          <GeneralPage
            state={this.state.generalPageState}
            setState={(generalPageState, cb = robot.noop) => {
              this.setState({generalPageState}, cb)
            }}
          />
        )
      }, {
        label: 'Theme',
        body: <ThemePage
          state={this.state.themePageState}
          setState={(themePageState, cb = robot.noop) => {
            this.setState({themePageState}, cb)
          }}
        />
      }, {
        label: 'Plugins',
        body: <PluginsPage
          state={this.state.pluginsPageState}
          setState={(pluginsPageState, cb = robot.noop) => {
            this.setState({pluginsPageState}, cb)
          }}
          tabsProps={{
            externalStyles: [styles.tabs, styles.nestedTabs],
            selectedIndex: this.state.pluginsPageState.activeTab,
            disableSorting: true
          }}
          tabProps={{
            externalStyles: styles.tab,
            externalStylesActive: styles.tabActive,
            externalAnchorStyles: styles.a,
            externalAnchorStylesActive: styles.aActive
          }}
        />
      }]
    },
    render() {
      return (
        <Full {...this.props} title="Settings">
          <Tabs
            externalStyles={[styles.tabs, styles.tabsInBar]}
            selectedIndex={this.state.activePage}
            disableSorting={true}
          >
            {this.pages().map((page, i) => (
              <Tab
                label={page.label}
                key={page.label}
                onActive={() => this.setState({ activePage: i })}
                externalStyles={styles.tab}
                externalStylesActive={styles.tabActive}
                externalAnchorStyles={styles.a}
                externalAnchorStylesActive={styles.aActive}
              >{page.body}</Tab>
            ))}
          </Tabs>

          <IconButton
            className={css(styles.saveButtonStyles)}
            onClick={() => {
              robot.notify('Saved settings!');

              window.location.reload();
            }}
          ><SaveIcon/></IconButton>
        </Full>
      )
    }
  })

  robot.registerComponent(Settings, SETTINGS_COMPONENT);

  robot.listen(/^settings$/, {
    description: "Settings",
    usage: 'settings'
  }, () => {
    robot.addCard('com.robinmalfait.settings');
  });

  robot.listen(/^restart$/, {
    description: "Restart",
    usage: 'restart'
  }, () => {
    restart();
  });

  robot.listen(/^open devtools$/, {
    description: 'Open the chrome dev tools',
    usage: 'open devtools'
  }, () => {
    getCurrentWindow().openDevTools();
  });

  robot.listen(/^quit$/, {
    description: 'Close the application',
    usage: 'quit'
  }, () => {
    app.quit();
  });

  robot.listen(/^refresh$/, {
    description: 'Refresh the window',
    usage: 'refresh'
  }, () => {
    window.location.reload();
  });

  robot.on(robot.events.OPEN_SETTINGS, () => {
    robot.addCard('com.robinmalfait.settings');
  });
}
