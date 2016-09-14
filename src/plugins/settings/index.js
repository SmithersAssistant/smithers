import React from 'react'
import styles from './indexStyles'

import IconButton from 'material-ui/IconButton/IconButton'
import SaveIcon from 'material-ui/svg-icons/content/save'

import {enhance, restorableComponent} from 'components/functions'

// Pages
import generalPage from './GeneralPage'
import themePage from './ThemePage'
import pluginsPage from './PluginsPage'

const SETTINGS_COMPONENT = 'com.robinmalfait.settings'

export default robot => {
  const {Blank} = robot.cards
  const {
    theme,

    withStyles,
    classNames,

    Tabs,
    Tab
  } = robot.UI

  const GeneralPage = generalPage(robot)
  const ThemePage = themePage(robot)
  const PluginsPage = pluginsPage(robot)

  const Settings = React.createClass({
    getInitialState () {
      return {
        activePage: 0,
        generalPageState: {
          checkingForUpdates: false,
          updateAvailable: false,
          updateDownloaded: false,
          downloadingUpdates: false
        },
        themePageState: {
          primaryColor: theme.primaryColor,
          secondaryColor: theme.secondaryColor
        },
        pluginsPageState: {
          activeTab: 0,
          addLocalPluginDialogOpen: false,
          addLocalPluginLocation: '',
          addLocalPluginErrorText: '',
          addExternalPluginDialogOpen: false,
          addExternalPluginPackage: ''
        }
      }
    },
    pages () {
      const {styles} = this.props

      return [{
        label: 'General',
        body: (
          <GeneralPage
            state={this.state.generalPageState}
            setState={(generalPageState, cb = robot.noop) => {
              this.setState({generalPageState: {
                ...this.state.generalPageState,
                ...generalPageState
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
              ...themePageState
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
    render () {
      const {styles, ...other} = this.props

      return (
        <Blank
          {...other}
          title='Settings'
        >
          <Tabs
            externalStyles={classNames(styles.tabs, styles.tabsInBar)}
            selectedIndex={this.state.activePage}
            disableSorting
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
            className={styles.saveButtonStyles}
            onClick={() => {
              robot.notify('Saved settings!')

              window.location.reload()
            }}
          ><SaveIcon /></IconButton>
        </Blank>
      )
    }
  })

  robot.registerComponent(enhance(Settings, [
    restorableComponent,
    withStyles(styles)
  ]), SETTINGS_COMPONENT)

  robot.listen(/^settings$/, {
    description: 'Settings',
    usage: 'settings'
  }, () => {
    robot.addCard('com.robinmalfait.settings')
  })

  robot.on(robot.events.OPEN_SETTINGS, () => {
    robot.addCard('com.robinmalfait.settings')
  })

  robot.on(robot.events.CHECK_FOR_UPDATES, () => {
    robot.addCard('com.robinmalfait.settings')
  })
}
