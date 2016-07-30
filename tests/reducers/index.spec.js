import cards from './cards.spec'
import commands from './commands.spec'
import notifications from './notifications.spec'

describe('Reducers', () => {
  cards();
  commands();
  notifications();
});
