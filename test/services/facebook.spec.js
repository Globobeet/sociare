'use strict';

import Facebook from '../../src/services/facebook.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('Facebook', () => {
    let service = new Facebook({ url: 'http://google.com', buttons: [] }),
        encoded = encodeURIComponent('http://google.com');

    it('should have the correct name', () => {
      expect(service.name).to.equal('facebook');
    });

    it('should provide the correct popup url', () => {
      expect(service.popupUrl).to.equal(`http://www.facebook.com/sharer.php?u=${encoded}`);
    });
  });
});
