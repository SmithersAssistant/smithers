import {expect} from 'chai';

import {deleteProps} from '../../../src/components/functions/index';

export default () => {
  describe('deleteProps', () => {
    it('should delete properties that are not needed anymore', () => {
      const noop = () => {}

      const props = {
        onClick: noop,
        className: 'someClassName',
        someRandomToBeDeleted: 123,
        onChange: noop
      };

      expect(deleteProps(props, ['someRandomToBeDeleted'])).to.deep.equal({
        onClick: noop,
        className: 'someClassName',
        onChange: noop
      });
    });
  });
};
