import cards from './cards.spec'
import commands from './commands.spec'
import notifications from './notifications.spec'
import settings from './settings.spec'

describe('Reducers', () => {
  cards()
  commands()
  notifications()
  settings()
})
