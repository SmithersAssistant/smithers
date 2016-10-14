import { getCardById } from 'state'
import { clipboard } from 'electron'

const SHARES_COMPONENT = 'com.robinmalfait.shares'
const BASE_URL = 'https://getsmithers.com'

export default robot => {
  const { React } = robot.dependencies
  const { Blank } = robot.cards
  const { Collection, CollectionItem, Button, Icon } = robot.UI
  const RECEIVE_REGEX = /^share receive (.*)$/

  function inject (code) {
    const UUID_REGEX = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/

    if (UUID_REGEX.test(code)) {
      return robot.fetchJson(`${BASE_URL}/api/shares/${code}`)
        .then(({ data }) => inject(data.payload))
    }

    try {
      const {
        plugin,
        card,
        props,
        state,
        id
      } = code

      if (!robot.cardExists(id)) {
        const pluginExists = robot.plugins().find(p => p.name === plugin)

        if (!pluginExists) {
          robot.execute(`install ${plugin} --silent`)
        }

        robot.injectSharedCard(id, card, props, state)
        clipboard.clear()
      }
    } catch (err) {
      robot.notify('We could not receive this share')
    }
  }

  window.addEventListener('focus', () => {
    const text = clipboard.readText()

    if (RECEIVE_REGEX.test(text)) {
      inject(RECEIVE_REGEX.exec(text)[1])
    }
  })

  class Shares extends React.Component {
    constructor (...args) {
      super(...args)

      this.state = {
        shares: []
      }
    }

    async componentWillMount () {
      this.fetchShares()
    }

    async fetchShares () {
      const headers = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `JWT ${window.localStorage.getItem('jwt.token')}`
        }
      }

      try {
        const { data: shares } = await robot.fetchJson(`${BASE_URL}/api/shares/mine`, headers)
        console.log(shares)
        this.setState({ shares })
      } catch ({ errors }) {
        if (errors && errors.message === 'jwt malformed') {
          return robot.notify('You are not authenticated, run `auth` to authenticate yourself and try again')
        }

        if (errors) {
          return robot.notify('Something went wrong while trying to share this card')
        }
      }
    }
    render () {
      const { shares = [] } = this.state
      const { ...other } = this.props
      return (
        <Blank
          title='My Shares'
          {...other}
        >
          <Collection>
            {shares.map((share, i) => (
              <CollectionItem
                key={i}
              >
                {share.payload.plugin}

                <Button className='right' onClick={(event) => robot.execute(`share receive ${share.id}`)}>
                  <Icon icon='play' />
                </Button>
              </CollectionItem>
            ))}
          </Collection>
        </Blank>
      )
    }
  }

  robot.registerComponent(Shares, SHARES_COMPONENT)

  robot.listen(/^share initiate (.*)$/, {
    description: 'share a card',
    usage: 'share initiate <id>'
  }, ({ matches }) => {
    try {
      const cardData = getCardById(matches.id)
      const data = {
        plugin: robot.plugins().find(plugin => plugin.cards.find(card => card.name === cardData.card)).name,
        ...cardData
      }

      robot.fetchJson(`${BASE_URL}/api/shares`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `JWT ${window.localStorage.getItem('jwt.token')}`
        },
        body: JSON.stringify({
          payload: data
        })
      })
        .then(({ data }) => {
          clipboard.writeText(`share receive ${data.id}`)
          robot.notify('The sharing code is in your clipboard, share it with your friend!')
        }, ({ errors }) => {
          if (errors && errors.message === 'jwt malformed') {
            return robot.notify('You are not authenticated, run `auth` to authenticate yourself and try again')
          }

          if (errors) {
            return robot.notify('Something went wrong while trying to share this card')
          }
        })
    } catch (err) {
      robot.notify('We could not share this card at the moment')
    }
  })

  robot.listen(RECEIVE_REGEX, {
    description: 'this will show a shared card',
    usage: 'share receive <code>'
  }, ({ matches }) => {
    inject(matches.code)
  })

  robot.listen(/^shares$/, {
    description: 'show all my shares',
    usage: 'shares'
  }, () => {
    robot.addCard(SHARES_COMPONENT)
  })
}
