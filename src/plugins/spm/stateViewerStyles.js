import {STATE_PENDING, STATE_BUSY, STATE_DONE, STATE_FAILED} from './states'

export default ({ color }) => ({
  // STATE_PENDING
  [`${STATE_PENDING}_icon`]: {
    marginRight: 8,
    color: color('grey')
  },
  [`${STATE_PENDING}_value`]: {
    color: color('grey')
  },

  // STATE_BUSY
  [`${STATE_BUSY}_icon`]: {
    marginRight: 8,
    color: color('orange')
  },
  [`${STATE_BUSY}_value`]: {
    fontWeight: 'bold'
  },

  // STATE_DONE
  [`${STATE_DONE}_icon`]: {
    marginRight: 8,
    color: color('green', 700)
  },
  [`${STATE_DONE}_value`]: {

  },

  // STATE_FAILED
  [`${STATE_FAILED}_icon`]: {
    marginRight: 8,
    color: color('red', 700)
  },
  [`${STATE_FAILED}_value`]: {
    color: color('red', 900)
  }
})
