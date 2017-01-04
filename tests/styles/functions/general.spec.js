import { expect } from 'chai'

import { px } from '../../../src/styles/functions/_general'

export default () => {
  describe('general', () => {
    describe('px', () => {
      it('should add px to every value, and return them as a string, separated by a space', () => {
        expect(px(1, 2, 3)).to.equal('1px 2px 3px')
      })
    })
  })
}
