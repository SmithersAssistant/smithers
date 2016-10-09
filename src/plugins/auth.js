import { remote } from 'electron'
import md5 from 'md5'

const { BrowserWindow } = remote

const BASE_URL = 'https://getsmithers.com'

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')

  var regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  var results = regex.exec(url)

  if (!results) return null
  if (!results[2]) return ''

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default robot => {
  const { React } = robot.dependencies
  const { Blank } = robot.cards
  const { material } = robot.UI
  const { Chip, Avatar } = material

  const AUTH_COMPONENT = 'com.robinmalfait.auth'
  class Auth extends React.Component {
    constructor (...args) {
      super(...args)

      this.state = {
        jwt: null,
        authenticated: false,
        met: {}
      }
    }

    componentDidMount () {
      if (!window.localStorage.getItem('jwt.token')) {
        const bw = new BrowserWindow({ show: false })

        bw.loadURL(`${BASE_URL}/login`)
        bw.once('ready-to-show', () => {
          bw.show()
        })

        bw.webContents.on('did-navigate', (event, url) => {
          const token = getParameterByName('token', url)

          if (token) {
            window.localStorage.setItem('jwt.token', token)
            this.setState({ jwt: token }, () => this.fetchUser())
            bw.destroy()
          }
        })
      } else {
        this.setState({
          jwt: window.localStorage.getItem('jwt.token')
        }, () => this.fetchUser())
      }
    }

    fetchUser () {
      robot.fetchJson(`${BASE_URL}/api/auth/me`, {
        headers: {
          'Accept-Header': 'application/json',
          'Authorization': `JWT ${this.state.jwt}`
        }
      })
        .then(({ data }) => {
          this.setState({
            me: data,
            authenticated: true
          })
        }, () => this.setState({ authenticated: false }))
    }

    render () {
      const { ...other } = this.props
      const { authenticated, me } = this.state

      return (
        <Blank title='Authenticate' {...other}>
          <h3>You have {authenticated ? '' : 'not'} been authenticated {authenticated ? '' : 'yet'}.</h3>

          {authenticated && (
            <Chip>
              <Avatar
                src={`https://s.gravatar.com/avatar/${md5(me.email)}?size=24&default=mm`}
              /> {me.firstName}
            </Chip>
          )}
        </Blank>
      )
    }
  }

  robot.registerComponent(Auth, AUTH_COMPONENT)

  robot.listen(/^auth$/, {
    description: 'authenticate yourself',
    usage: 'auth'
  }, () => {
    robot.addCard(AUTH_COMPONENT)
  })
}
