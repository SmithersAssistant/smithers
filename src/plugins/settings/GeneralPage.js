import React from 'react';
import {remote} from 'electron';
const {app, autoUpdater} = remote;

const isDevMode = process.env.NODE_ENV === 'development';

export default (robot) => {
  const {UPDATE_AVAILABLE, UPDATE_DOWNLOADED, CHECKING_FOR_UPDATES, UPDATE_NOT_AVAILABLE} = robot.events;
  const {
    A,
    Button,
    Icon,
    CheckBoxField,
    Collection,
    CollectionItem
  } = robot.UI;

  return React.createClass({
    componentDidMount() {
      this.removeListeners = [
        robot.on(UPDATE_AVAILABLE, () => {
          robot.notify('An update is available!')

          this.props.setState({
            checking_for_updates: false,
            update_available: true,
            downloading_updates: true
          })
        }),
        robot.on(CHECKING_FOR_UPDATES, () => {
          this.props.setState({
            checking_for_updates: true
          })
        }),
        robot.on(UPDATE_NOT_AVAILABLE, () => {
          this.props.setState({
            checking_for_updates: false,
            update_available: false,
            downloading_updates: false,
            update_downloaded: false
          })
        }),
        robot.on(UPDATE_DOWNLOADED, () => {
          this.props.setState({
            update_downloaded: true,
            downloading_updates: false
          })
        })
      ]
    },
    componentWillUnmount() {
      this.removeListeners.map(removeListener => removeListener())
    },
    checkForUpdates() {
      if (!isDevMode) {
        autoUpdater.checkForUpdates();
      }
    },
    renderButtonContents() {
      const {checking_for_updates, downloading_updates} = this.props.state

      if (checking_for_updates) {
        return (
          <span><Icon icon="refresh fa-spin breathing"/> Checking for updates...</span>
        )
      }

      if (downloading_updates) {
        return (
          <span><Icon icon="refresh fa-spin breathing"/> Downloading updates...</span>
        )
      }

      return (
        <span>Check for updates</span>
      )
    },
    render() {
      const {update_available, update_downloaded} = this.props.state

      return (
        <Collection>
          <CollectionItem>
            Current version: v{app.getVersion()}
            <Button disabled={isDevMode} className="right" onClick={this.checkForUpdates}>
              {this.renderButtonContents()}
            </Button>
            {update_available && (
              <span className="right breathing">update available{update_downloaded && (
                <span>, <A onClick={() => autoUpdater.quitAndInstall()}>install update</A></span>
              )}</span>
            )}
          </CollectionItem>
          <CollectionItem>
            <CheckBoxField
              label="Show tabs"
              labelPosition="left"
              onCheck={(e, isChecked) => isChecked ? robot.showTabs() : robot.hideTabs()}
              checked={window.state().tabs.visible}
            />
          </CollectionItem>
        </Collection>
      )
    }
  })
}
