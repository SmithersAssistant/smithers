const SPM_OVERVIEW_COMPONENT = 'com.robinmalfait.spm.overview'

import LocalPage from './plugins/local'
import ExternalPage from './plugins/external'
import DefaultPage from './plugins/default'

export default robot => {
  const {React} = robot.dependencies
  const {Blank} = robot.cards
  const {enhance, restorableComponent, withStyles} = robot
  const {
    Tab,
    Tabs
  } = robot.UI

  const Overview = React.createClass({
    getInitialState () {
      return {
        activeTab: 0
      }
    },
    render () {
      const {styles, ...other} = this.props
      const {activeTab} = this.state

      const pages = [{
        label: 'Local plugins',
        body: <LocalPage robot={robot} />
      }, {
        label: 'External plugins',
        body: <ExternalPage robot={robot} />
      }, {
        label: 'Default plugins',
        body: <DefaultPage robot={robot} />
      }]

      return (
        <Blank
          {...other}
          title='SPM Overview'
        >
          <Tabs
            disableSorting
            externalStyles={[styles.tabs, styles.tabsInBar]}
            selectedIndex={activeTab}
          >
            {pages.map((page, i) => (
              <Tab
                externalStyles={styles.tab}
                externalStylesActive={styles.tabActive}
                externalAnchorStyles={styles.a}
                externalAnchorStylesActive={styles.aActive}
                key={i}
                onActive={() => this.setState({
                  activeTab: i
                })}
                label={page.label}
              ><div style={{padding: 20}}>{page.body}</div></Tab>
            ))}
          </Tabs>
        </Blank>
      )
    }
  })

  robot.registerComponent(enhance(Overview, [
    restorableComponent,
    withStyles(({theme}) => ({
      tabs: {
        borderTop: 'none',
        backgroundColor: 'white',
        borderBottom: '1px solid whitesmoke',
        height: theme.tabHeight + 1
      },
      tabsInBar: {
        position: 'absolute',
        top: 0,
        left: 173,
        right: 48
      },
      tab: {
        backgroundColor: 'white'
      },
      tabActive: {
        borderBottom: '2px solid black'
      },
      a: {
        color: 'rgba(0, 0, 0, .7)'
      },
      aActive: {
        color: 'black'
      }
    }))
  ]), SPM_OVERVIEW_COMPONENT)

  robot.listen(/^spm overview$/, {
    description: 'get an overview of all the plugins that are installed',
    usage: 'spm overview'
  }, () => {
    robot.addCard(SPM_OVERVIEW_COMPONENT)
  })
}
