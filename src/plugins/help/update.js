import { ipcRenderer } from 'electron'
const UPDATE_AVAILABLE_COMPONENT = 'com.robinmalfait.smithers.update'

export default robot => {
  const { React } = robot.dependencies
  const { Blank } = robot.cards
  const { color, theme, material } = robot.UI
  const { RaisedButton, LinearProgress } = material

  class UpdateAvailable extends React.Component {
    state = {
      downloaded: false,
      restarting: 30
    }

    componentDidMount () {
      this.listeners = [
        robot.on(robot.events.UPDATE_DOWNLOADED, () => {
          this.setState({ downloaded: true })
          this._interval = setInterval(() => {
            let restarting = this.state.restarting - 1

            if (restarting === 0) {
              return this.quitAndInstall()
            }

            this.setState({ restarting })
          }, 1000)
        }),
        () => clearInterval(this._interval)
      ]
    }

    componentWillUnmount () {
      this.listeners.forEach(l => l())
    }

    quitAndInstall () {
      this.props.removeCard()
      ipcRenderer.send('quit_and_install')
      clearInterval(this._interval)
      return
    }

    renderDownloading () {
      return (
        <div>
          An update is downloading...

          <LinearProgress
            mode='indeterminate'
          />
        </div>
      )
    }

    renderDownloaded () {
      const { restarting } = this.state

      return (
        <span>
          Update downloaded
          <br />
          <small>Restarting in {restarting}</small>
        </span>
      )
    }

    renderButtonLabel () {
      if (this.state.downloaded) {
        return {
          onClick: () => this.quitAndInstall(),
          label: 'Restart'
        }
      }

      return {
        disabled: true,
        label: 'Waiting...'
      }
    }

    render () {
      const { ...other } = this.props
      const { downloaded } = this.state

      return (
        <Blank
          {...other}
          title='Update Available!'
        >
          <h1 style={{
            textAlign: 'center',
            paddingTop: 100,
            paddingBottom: 100,
            maxWidth: 500,
            margin: '0 auto'
          }}>
            {downloaded
              ? this.renderDownloaded()
              : this.renderDownloading()}
          </h1>

          <div className='right'>
            <RaisedButton
              backgroundColor={color(theme.primaryColor)}
              labelColor={color('grey', 50)}
              {...this.renderButtonLabel()}
            />
          </div>
        </Blank>
      )
    }
  }

  robot.registerComponent(UpdateAvailable, UPDATE_AVAILABLE_COMPONENT)

  const showUpdateAvailableCard = () => {
    const cardExist = robot.getCardsByIdentifier(UPDATE_AVAILABLE_COMPONENT).length > 0

    // Only show 1 update card per plugin
    if (!cardExist) {
      robot.addCard(UPDATE_AVAILABLE_COMPONENT)
    }
  }

  robot.on(robot.events.UPDATE_AVAILABLE, () => {
    showUpdateAvailableCard()
  })
}
