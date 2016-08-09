import React from 'react'
import {remote} from 'electron'
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

  const {Blank} = robot.cards
  const {
    theme,

    Tabs,
    Tab,
  } = robot.UI

  const GeneralPage = generalPage(robot);
  const ThemePage = themePage(robot);
  const PluginsPage = pluginsPage(robot);
  
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
          activeTab: 0,
          addLocalPluginDialogOpen: false,
          addLocalPluginLocation: '',
          addLocalPluginErrorText: '',
          addExternalPluginDialogOpen: false,
          addExternalPluginPackage: '',
        }
      }
    },
    componentDidMount() {
      this.listeners = [
        robot.on(robot.events.PLUGIN_INSTALLED, ({module}) => {
          robot.notify(`'${module}' installed`);
          this.setState({pluginsPageState: {
            ...this.state.pluginsPageState
          }});
        }),
        robot.on(robot.events.PLUGIN_INSTALLING, ({module}) => {
          robot.notify(`Installing '${module}', please hold on`);
          this.setState({pluginsPageState: {
            ...this.state.pluginsPageState
          }});
        }),
        robot.on(robot.events.PLUGIN_DELETED, ({module}) => {
          robot.notify(`'${module}' deleted`);
          this.setState({pluginsPageState: {
            ...this.state.pluginsPageState
          }});
        }),
        robot.on(robot.events.PLUGIN_DELETING, ({module}) => {
          robot.notify(`Deleting '${module}', please hold on`);
          this.setState({pluginsPageState: {
            ...this.state.pluginsPageState
          }});
        })
      ];
    },
    componentWillUnmount() {
      (this.listeners || []).forEach(x => x());
    },
    pages() {
      return [{
        label: 'General',
        body: (
          <GeneralPage
            state={this.state.generalPageState}
            setState={(generalPageState, cb = robot.noop) => {
              this.setState({generalPageState: {
                ...this.state.generalPageState,
                ...generalPageState,
              }}, cb)
            }}
          />
        )
      }, {
        label: 'Theme',
        body: <ThemePage
          state={this.state.themePageState}
          setState={(themePageState, cb = robot.noop) => {
            this.setState({themePageState: {
              ...this.state.themePageState,
              ...themePageState,
            }}, cb)
          }}
        />
      }, {
        label: 'Plugins',
        body: <PluginsPage
          state={this.state.pluginsPageState}
          setState={(pluginsPageState, cb = robot.noop) => {
            this.setState({pluginsPageState: {
              ...this.state.pluginsPageState,
              ...pluginsPageState
            }}, cb)
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
        <Blank {...this.props} title="Settings">
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
        </Blank>
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

  robot.on(robot.events.OPEN_SETTINGS, () => {
    robot.addCard('com.robinmalfait.settings');
  });

  robot.on(robot.events.CHECK_FOR_UPDATES, () => {
    robot.addCard('com.robinmalfait.settings');
  });
}
