import {expect} from 'chai'

import notifications, {defaultState} from '../../src/reducers/notifications'
import {ENQUEUE_NOTIFICATION, DEQUEUE_NOTIFICATION} from '../../src/actions/types'

export default () => {
  describe('notifications', () => {
    it('should have a default state', () => {
      const state = []

      expect(defaultState).to.deep.equal(state)
    })

    it('should enqueue a notification', () => {
      const state = []

      const action = {
        type: ENQUEUE_NOTIFICATION,
        msg: 'Some notification message'
      }

      let newState = notifications(state, action)
      expect(newState.length).to.equal(1)
      expect(newState[0]).to.equal('Some notification message')
    })

    it('should dequeue a notification', () => {
      const notificationOne = 'notification one'
      const notificationTwo = 'notification two'
      const notificationThree = 'notification three'

      const state = [notificationOne, notificationTwo, notificationThree]

      const action = {
        type: DEQUEUE_NOTIFICATION
      }

      let newState = notifications(state, action)

      expect(newState.length).to.equal(2)
      expect(newState[0]).to.equal(notificationOne)
      expect(newState[1]).to.equal(notificationTwo)
    })
  })
}
