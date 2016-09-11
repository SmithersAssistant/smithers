import {expect} from 'chai';

import classNames from '../../../src/components/functions/classNames';

export default () => {
  describe('classNames', () => {
    it('should return a list of passed class names', () => {
      expect(classNames('a', 'b', 'c')).to.equal('a b c');
    });

    it('should filter out undefined, null, false, 0 values', () => {
      expect(classNames('a', undefined, 'b')).to.equal('a b');
      expect(classNames('a', false, 'b')).to.equal('a b');
      expect(classNames('a', null, 'b')).to.equal('a b');
      expect(classNames('a', 0, 'b')).to.equal('a b');
    });

    it('should flatten arrays of class names as well', () => {
      expect(classNames(['a', 'b', 'c'])).to.equal('a b c');
    });

    it('should take as many arguments', () => {
      expect(classNames('a')).to.equal('a');
      expect(classNames('a', 'b')).to.equal('a b');
      expect(classNames('a', 'b', 'c')).to.equal('a b c');
      expect(classNames('a', 'b', 'c', 'd')).to.equal('a b c d');
    });

    it('should flatten multiple values with arrays to one string', () => {
      expect(classNames('a', 'b', ['c', 'd', ['e', 'f']], 'g')).to.equal('a b c d e f g');
    });
  });
};
