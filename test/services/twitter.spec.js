'use strict';

import Twitter from '../../src/services/twitter.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('Twitter', () => {
    let service = new Twitter({ url: 'http://google.com', buttons: [] }),
        encoded = encodeURIComponent('http://google.com');

    it('should have the correct name', () => {
      expect(service.name).to.equal('twitter');
    });

    describe('popupUrl', () => {
      let base = `https://twitter.com/intent/tweet?url=${encoded}`,
          extras = new Twitter({
            url: 'http://google.com',
            buttons: [{
              type: 'twitter',
              extras: {
                text: 'Test text',
                via: 'test',
                hashtags: 'foo,bar'
              }
            }]
          });

      it('should provide the correct popup url', () => {
        expect(service.popupUrl).to.equal(base);
      });

      it('should handle extras', () => {
        expect(extras.popupUrl).to.equal(`${base}&text=Test%20text&via=test&hashtags=foo,bar`);
      });
    });
  });
});
