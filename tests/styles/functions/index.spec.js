import importantTests from './important.spec'
import mathTests from './math.spec'
import generalTests from './general.spec'

export default () => {
  describe('Functions', () => {
    importantTests()
    mathTests()
    generalTests()
  });
}
