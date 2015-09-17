'use strict';

import GooglePlus from '../../src/services/googleplus.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('GooglePlus', () => {
    let service = new GooglePlus({ url: 'http://google.com', buttons: [] }),
        encoded = encodeURIComponent('http://google.com');

    it('should have the correct name', () => {
      expect(service.name).to.equal('googleplus');
    });

    it('should provide the correct popup url', () => {
      expect(service.popupUrl).to.equal(`https://plus.google.com/share?url=${encoded}`);
    });
  });
});
