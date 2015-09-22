'use strict';

import Sociare from '../src/index.js';
import utils from '../src/utils.js';

describe('Sociare', () => {
  let root = document.createElement('div');

  before(() => {
    window.SociareConfig = {
      countUrl: 'http://counter.com',
      url: 'http://test.com',
      buttons: ['twitter', 'facebook']
    };
  });

  beforeEach(() => { root.innerHTML = ''; });
  after(() => { delete window.SociareConfig; });

  describe('constructor', () => {
    it('should set up all the networks', () => {
      let sociare = new Sociare(root);
      expect(sociare.twitter).to.not.be.undefined;
      expect(sociare.facebook).to.not.be.undefined;
      expect(sociare.googleplus).to.not.be.undefined;
      expect(sociare.pinterest).to.not.be.undefined;
      expect(sociare.linkedin).to.not.be.undefined;
    });
  });

  describe('_networks', () => {
    let sociare;

    beforeEach(() => {
      sociare = new Sociare(root, {
        buttons: [
          'twitter',
          {
            type: 'facebook',
            template: 'Share on Facebook'
          }
        ]
      });
    });

    it('should return a map of the various button types', () => {
      expect(sociare._networks).to.deep.equal(['twitter', 'facebook']);
    });
  });

  describe('_countUrl', () => {
    describe('if countUrl is supplied in config', () => {
      it('should return config.countUrl', () => {
        let sociare = new Sociare(root);
        expect(sociare._countUrl).to.equal('http://counter.com');
      });
    });

    describe('if countUrl is not supplied in config', () => {
      it('should throw an error', () => {
        let sociare = new Sociare(root, { countUrl: undefined }),
            spy = sinon.spy();

        try { sociare._countUrl; }
        catch (err) { spy(err); }
        finally {
          expect(spy).have.been.calledOnce;
          expect(spy.args[0][0]).to.be.an('error');
        }
      });
    });
  });

  describe('_url', () => {
    describe('if url is supplied in config', () => {
      it('should return config.url', () => {
        let sociare = new Sociare(root);
        expect(sociare._url).to.equal('http://test.com');
      });
    });

    describe('if url is not supplied in config', () => {
      it('should return the current location', () => {
        let sociare = new Sociare(root, { url: undefined });
        expect(sociare._url).to.equal(window.location.href);
      });
    });
  });

  describe('_getCounts', () => {
    let test_url = 'http://counter.com?url=http://test.com&networks=twitter,facebook',
        request, sociare;

    beforeEach(() => {
      sociare = new Sociare(root);
      request = sinon.stub(utils, 'request');
      request.returns(Promise.resolve('test-request'));
    });

    afterEach(() => { request.restore(); });

    it('should resolve with 0 counts if counts are not necessary', () => {
      let sociare2 = new Sociare(root, { getCounts: false });

      return sociare2._getCounts().then(function (counts) {
        expect(counts).to.deep.equal({
          facebook: 0,
          twitter: 0
        });
      });
    });

    it('should return a request', () => {
      return sociare._getCounts()
        .then(result => {
          expect(result).to.equal('test-request');
        });
    });

    it('should request a fully-built URL', () => {
      return sociare._getCounts()
        .then(result => {
          expect(request).to.have.been.calledOnce;
          expect(request).to.have.been.calledWithExactly(test_url);
        });
    });

    it('should handle query string options', () => {
      let noQuery = new Sociare(root, { noQueryCount: true });
      return noQuery._getCounts()
        .then(result => {
          expect(request).to.have.been.calledWithExactly(`${test_url}&omitQuery=true`);
        });
    });

    describe('on failure', () => {
      let error;

      beforeEach(() => {
        request.returns(Promise.reject('test error'));
        error = sinon.stub(console, 'error');
      });

      afterEach(() => { error.restore(); });

      it('should log the error', () => {
        return sociare._getCounts()
          .then(result => {
            expect(error).to.have.been.calledOnce;
            expect(error).to.have.been.calledWith('[Sociare Error]', 'test error')
          });
      });

      it('should supply 0 counts', () => {
        return sociare._getCounts()
          .then(result => {
            expect(result).to.deep.equal({
              facebook: 0,
              twitter: 0
            });
          });
      });
    });
  });

  describe('_renderButtons', () => {
    let fake_counts = { twitter: 5, facebook: 10 },
        sociare, twitter, facebook;

    function _generateButton(type) {
      var button = document.createElement('p');
      button.innerHTML = `${type} button`;
      return button;
    }

    beforeEach(() => {
      sociare = new Sociare(root);
      twitter = sinon.stub(sociare.twitter, 'generateButton', () => _generateButton('twitter'));
      facebook = sinon.stub(sociare.facebook, 'generateButton', () => _generateButton('facebook'));
    });

    afterEach(() => {
      twitter.restore();
      facebook.restore();
    });

    it('should generate a button for each network supplied', function () {
      sociare._renderButtons(fake_counts);
      expect(twitter).to.have.been.calledOnce;
      expect(facebook).to.have.been.calledOnce;
      expect(root.innerHTML).to.equal('<p>twitter button</p><p>facebook button</p>');
    });
  });

  describe('render', () => {
    let sociare, render, counts, error;

    beforeEach(() => {
      sociare = new Sociare(root);
      render = sinon.stub(Sociare.prototype, '_renderButtons');
      counts = sinon.stub(Sociare.prototype, '_getCounts');
      counts.returns(Promise.resolve({ twitter: 5, facebook: 2 }));
      error = sinon.stub(console, 'error');
    });

    afterEach(() => {
      render.restore();
      counts.restore();
      error.restore();
    });

    it('should render the buttons and then get the counts, applying them once they come in', () => {
      return sociare.render().finally(function () {
        expect(render).to.have.been.calledOnce;
        expect(counts).to.have.been.calledOnce;
        expect(render).to.have.been.calledBefore(counts);
        expect(sociare.facebook.count).to.equal(2);
        expect(sociare.twitter.count).to.equal(5);
      });
    });

    it('should log out errors', function () {
      counts.returns(Promise.reject({ message: 'test error' }));

      return sociare.render().finally(() => {
        expect(error).to.have.been.calledOnce;
        expect(error.args[0][0]).to.equal('[Sociare Error]');
        expect(error.args[0][1].message).to.equal('test error');
      });
    });
  });
});
