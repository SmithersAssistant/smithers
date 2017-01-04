import {expect} from 'chai'

import {important} from '../../../src/styles/functions/_important'

export default () => {
  describe('important', () => {
    it('should append !important after a given value', () => {
      expect(important('#0088cc')).to.equal('#0088cc !important')
    })
  })
}
