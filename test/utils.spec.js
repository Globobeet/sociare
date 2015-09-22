'use strict';

import utils from '../src/utils.js';

describe('Utils', () => {
  let server;

  before(() => {
    server = sinon.fakeServer.create({ respondImmediately: true });

    server.setResponse = (route, data, method, code) => {
      var opts = {
          method: method || 'GET',
          code: code || 200,
          data: data || {}
      };

      server.respondWith(opts.method, route, [opts.code, { 'Content-Type': 'application/json' }, JSON.stringify(opts.data)]);
    };
  });

  after(() => { server.restore(); });

  describe('request', () => {
    let url = '/test',
        open;

    beforeEach(() => {
      server.setResponse(url, { test: 'data' });
      open = sinon.spy(XMLHttpRequest.prototype, 'open');
    });

    afterEach(() => { open.restore(); });

    it('should send an XHR request for the given URL', () => {
      return utils.request(url)
        .then(() => {
          expect(open).to.have.been.calledOnce;
          expect(open).to.have.been.calledWith('GET', url);
        });
    });

    it('should resolve with the returned data', () => {
      let success = sinon.spy(),
          fail = sinon.spy();

      return utils.request(url)
        .then(success, fail)
        .then(() => {
          expect(success).to.have.been.calledOnce;
          expect(success).to.have.been.calledWithExactly({ test: 'data' });
        });
    });

    it('should reject if response code is >= 400', () => {
      server.setResponse(url, { message: 'Test error.' }, 'GET', 400);

      let success = sinon.spy(),
          fail = sinon.spy();

      return utils.request(url)
        .then(success, fail)
        .then(() => {
          expect(fail).to.have.been.calledOnce;
          expect(fail).to.have.been.calledWithExactly({ message: 'Test error.' });
        });
    });

    it('should reject if an error happens', () => {
      let success = sinon.spy(),
          fail = sinon.spy(),
          send = sinon.stub(XMLHttpRequest.prototype, 'send', function () {
            this.responseText = 'Other error.'
            return this.onerror();
          });

      return utils.request(url)
        .then(success, fail)
        .then(() => {
          expect(fail).to.have.been.calledOnce;
          expect(fail.args[0][0]).to.contain(`Unable to connect to ${url}`);
          expect(fail.args[0][0]).to.contain('Other error.');
          send.restore();
        });
    });
  });

  describe('extend', () => {
    let a = { foo: 'foo', bar: 'bar' },
        b = { bar: 'baz', zed: 'zed' },
        c = { foo: 'foo2', buz: 'buz' };

    it('should return an empty object if nothing passed', () => {
      expect(utils.extend()).to.deep.equal({});
    });

    it('should merge objects from right to left', () => {
      expect(utils.extend(a, b)).to.deep.equal({
        foo: 'foo',
        bar: 'baz',
        zed: 'zed'
      });
    });

    it('should handle more than two objects', () => {
      expect(utils.extend(a, b, c)).to.deep.equal({
        foo: 'foo2',
        bar: 'baz',
        buz: 'buz',
        zed: 'zed'
      });
    });
  });
});
