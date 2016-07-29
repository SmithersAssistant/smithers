import {expect} from 'chai';

import cards, {defaultState} from '../../src/reducers/cards';
import {ADD_CARD, REMOVE_CARD} from '../../src/actions/types';

describe('Reducers', () => {
  describe('cards', () => {
    it('should have a default state', () => {
      const state = {
        cards: []
      };

      expect(defaultState).to.deep.equal(state);
    });

    it('should add a card', () => {
      const state = {
        cards: []
      };

      const action = {
        type: ADD_CARD,
        card: 'some card',
        props: {
          some_property: 'some_property'
        },
        id: 'someUniqueID',
        relation: 'none'
      };

      let newState;
      newState = cards(state, action);
      expect(newState.cards.length).to.equal(1);

      const firstCard = newState.cards[0];
      expect(firstCard).to.not.be.undefined;
      expect(firstCard.card).to.equal('some card');
      expect(firstCard.props).to.deep.equal({some_property: 'some_property'});
      expect(firstCard.id).to.equal('someUniqueID');
      expect(firstCard.relation).to.equal('none');
      expect(firstCard.state).to.deep.equal({});

      newState = cards(newState, action);
      expect(newState.cards.length).to.equal(2);
    });

    it('should remove a card', () => {
      const cardA = {
        card: 'card a',
        props: {},
        state: {},
        id: 'idOfCardA',
        relation: 'none'
      };

      const cardB = {
        card: 'card b',
        props: {},
        state: {},
        id: 'idOfCardB',
        relation: 'none'
      };

      const state = {
        cards: [cardA, cardB]
      };

      const action = {
        type: REMOVE_CARD,
        id: 'idOfCardA'
      };

      let newState = cards(state, action);
      expect(newState.cards.length).to.equal(1);
      expect(newState.cards[0]).to.deep.equal(cardB);
    });
  });
});
