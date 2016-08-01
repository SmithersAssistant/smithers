import React from 'react'
import {remote} from 'electron'
const {app, getCurrentWindow} = remote
import {StyleSheet, css} from 'aphrodite'
import styles from './indexStyles'

// Pages
import generalPage from './GeneralPage'
import themePage from './ThemePage'

const SETTINGS_COMPONENT = 'com.robinmalfait.settings';

export default robot => {

  const {Full} = robot.cards
  const {
    theme,

    Button,
    Icon,
    Tabs,
    Tab,
  } = robot.UI


  const GeneralPage = generalPage(robot);
  const ThemePage = themePage(robot);

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
      }]
    },
    render() {
      return (
        <Full {...this.props} title="Settings">
          <Tabs
            externalStyles={styles.tabs}
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
              >
                <div style={{
                  padding: 20
                }}>
                  {page.body}
                </div>
              </Tab>
            ))}
          </Tabs>

          <div className={css(styles.saveButtonStyles)}>
            <Button onClick={() => {
              robot.notify('Saved settings!');

              window.location.reload();
            }}>
              <Icon icon="save"/> Save
            </Button>
          </div>
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

  robot.on(robot.events.OPEN_SETTINGS, () => {
    robot.addCard('com.robinmalfait.settings');
  });
}
