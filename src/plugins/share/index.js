import { getCardById } from 'state'
import { clipboard } from 'electron'

export default robot => {
  const RECEIVE_REGEX = /^share receive (.*)$/

  function inject (code) {
    try {
      const {
        plugin,
        card,
        props,
        state,
        id
      } = JSON.parse(window.atob(code))

      if (!robot.cardExists(id)) {
        const pluginExists = robot.plugins().find(p => p.name === plugin)

        if (!pluginExists) {
          robot.execute(`install ${plugin} --silent`)
        }

        robot.injectSharedCard(id, card, props, state)
        clipboard.writeText('')
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
      clipboard.writeText(`share receive ${window.btoa(JSON.stringify(data))}`)
      robot.notify('The sharing code is in your clipboard, share it with your friend!')
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
