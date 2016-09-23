import React from 'react'
import {remote, ipcRenderer} from 'electron'
import config from 'config'
import KeyboardRecorder from './KeyboardRecorder'
const {app} = remote

const isDevMode = process.env.NODE_ENV === 'development'

export default (robot) => {
  const {UPDATE_AVAILABLE, UPDATE_DOWNLOADED, CHECKING_FOR_UPDATES, UPDATE_NOT_AVAILABLE} = robot.events
  const {
    Button,
    Icon,
    Collection,
    CollectionItem
  } = robot.UI

  const {Checkbox} = robot.UI.material

  return class extends React.Component {
    componentDidMount () {
      this.removeListeners = [
        robot.on(UPDATE_AVAILABLE, () => {
          robot.notify('An update is available!')

          this.props.setState({
            checkingForUpdates: false,
            updateAvailable: true,
            downloadingUpdates: true
          })
        }),
        robot.on(CHECKING_FOR_UPDATES, () => {
          this.props.setState({
            checkingForUpdates: true
          })
        }),
        robot.on(UPDATE_NOT_AVAILABLE, () => {
          this.props.setState({
            checkingForUpdates: false,
            updateAvailable: false,
            downloadingUpdates: false,
            updateDownloaded: false
          })
        }),
        robot.on(UPDATE_DOWNLOADED, () => {
          this.props.setState({
            updateDownloaded: true,
            downloadingUpdates: false
          })
        })
      ]
    }

    componentWillUnmount () {
      this.removeListeners.map(removeListener => removeListener())
    }

    checkForUpdates = () => {
      if (!isDevMode) {
        ipcRenderer.send('CHECK_FOR_UPDATES')
      }
    };

    renderButtonContents = () => {
      const {checkingForUpdates, downloadingUpdates} = this.props.state

      if (checkingForUpdates) {
        return (
          <span><Icon icon='refresh fa-spin breathing' /> Checking for updates...</span>
        )
      }

      if (downloadingUpdates) {
        return (
          <span><Icon icon='refresh fa-spin breathing' /> Downloading updates...</span>
        )
      }

      return (
        <span>Check for updates</span>
      )
    };

    render () {
      return (
        <Collection>
          <CollectionItem className='clearfix'>
            Current version: v{app.getVersion()}
            <Button disabled={isDevMode} className='right' onClick={this.checkForUpdates}>
              {this.renderButtonContents()}
            </Button>
          </CollectionItem>
          <CollectionItem className='clearfix'>
            <Checkbox
              label='Show tabs'
              labelPosition='left'
              onCheck={(e, isChecked) => isChecked ? robot.showTabs() : robot.hideTabs()}
              checked={window.state().tabs.visible}
            />
          </CollectionItem>
          <CollectionItem className='clearfix'>
            Smithers Hotkey
            <div className='right'>
              <KeyboardRecorder
                shortcut={config.get('keyboardShortcuts.toggleWindow', 'Alt+S')}
                onDone={(combination) => {
                  config.set('keyboardShortcuts.toggleWindow', combination)
                  ipcRenderer.send('register_all_shortcuts', JSON.stringify(config.get('keyboardShortcuts')))
                }}
              />
            </div>
          </CollectionItem>
        </Collection>
      )
    }
  }
}
