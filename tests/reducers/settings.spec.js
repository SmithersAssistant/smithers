import {expect} from 'chai';

import settings, {defaultState} from '../../src/reducers/settings';
import {SET_THEME, SET_VOICE} from '../../src/actions/types';

export default () => {
  describe('settings', () => {
    it('should have a default state', () => {
      const state = {
        theme: 'indigo',
        voice: undefined
      };

      expect(defaultState).to.deep.equal(state);
    });

    it('should be able to set the theme', () => {
      const state = defaultState;

      const action = {
        type: SET_THEME,
        theme: 'purple'
      }

      let newState = settings(state, action);
      expect(newState).to.deep.equal({
        theme: 'purple',
        voice: undefined
      });
    });

    it('should be able to set the voice', () => {
      const state = defaultState;

      const action = {
        type: SET_VOICE,
        voice: 'agnes'
      }

      let newState = settings(state, action);
      expect(newState).to.deep.equal({
        theme: 'indigo',
        voice: 'agnes'
      });
    });
  });
}
