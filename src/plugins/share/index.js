import { getCardById } from 'state'
import { clipboard } from 'electron'

const BASE_URL = 'https://getsmithers.com'

export default robot => {
  const RECEIVE_REGEX = /^share receive (.*)$/

  function inject (code) {
    const UUID_REGEX = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/

    if (UUID_REGEX.test(code)) {
      return robot.fetchJson(`${BASE_URL}/api/share/${code}`)
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

      robot.fetchJson(`${BASE_URL}/api/share`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          payload: data
        })
      })
        .then(({ errors, data }) => {
          if (errors) {
            return robot.notify('Something went wrong while trying to share this card')
          }

          clipboard.writeText(`share receive ${data.id}`)
          robot.notify('The sharing code is in your clipboard, share it with your friend!')
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
}
