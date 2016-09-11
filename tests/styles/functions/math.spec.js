import { expect } from 'chai'

import { sum } from '../../../src/styles/functions/_math'

export default () => {
  describe('math', () => {

    describe('sum', () => {
      it('should sum up all the values', () => {
        expect(sum(1, 2, 3)).to.equal(6)
      })
    })

  })
}
