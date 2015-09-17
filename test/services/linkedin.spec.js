'use strict';

import LinkedIn from '../../src/services/linkedin.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('LinkedIn', () => {
    let service = new LinkedIn({ url: 'http://google.com', buttons: [] }),
        encoded = encodeURIComponent('http://google.com');

    it('should have the correct name', () => {
      expect(service.name).to.equal('linkedin');
    });

    describe('popupUrl', () => {
      let base = `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}`,
          extras = new LinkedIn({
            url: 'http://google.com',
            buttons: [{
              type: 'linkedin',
              extras: {
                title: 'Test title',
                summary: 'Test summary',
                source: 'Example'
              }
            }]
          });

      it('should provide the correct popup url', () => {
        expect(service.popupUrl).to.equal(base);
      });

      it('should handle extras', () => {
        expect(extras.popupUrl).to.equal(`${base}&title=Test%20title&summary=Test%20summary&source=Example`);
      });
    });
  });
});
