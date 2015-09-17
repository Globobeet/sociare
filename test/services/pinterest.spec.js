'use strict';

import Pinterest from '../../src/services/pinterest.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('Pinterest', () => {
    let service = new Pinterest({ url: 'http://google.com', buttons: [] }),
        encoded = encodeURIComponent('http://google.com');

    it('should have the correct name', () => {
      expect(service.name).to.equal('pinterest');
    });

    describe('popupUrl', () => {
      let base = `http://pinterest.com/pin/create/button/?url=${encoded}`,
          extras = new Pinterest({
            url: 'http://google.com',
            buttons: [{
              type: 'pinterest',
              extras: {
                media: 'Test media',
                description: 'Test description'
              }
            }]
          });

      it('should provide the correct popup url', () => {
        expect(service.popupUrl).to.equal(base);
      });

      it('should handle extras', () => {
        expect(extras.popupUrl).to.equal(`${base}&media=Test%20media&description=Test%20description`);
      });
    });
  });
});
