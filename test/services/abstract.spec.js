'use strict';

import AbstractService from '../../src/services/abstract.js';
import utils from '../../src/utils.js';

describe('Sociare', () => {
  describe('AbstractService', () => {
    let defaultConfig = {
      buttonTag: 'a',
      buttonId: '',
      buttonClass: 'sociare sociare-{network}',
      buttonAttrs: {},
      buttonTemplate: 'Share on {network} - {count}'
    };

    class TestService extends AbstractService {
      get name() { return 'test'; }
      get popupUrl() { return 'http://test.com' }
    };

    describe('default params', () => {
      let service = new AbstractService(utils.extend(defaultConfig, { buttons: [] }));

      it('should default name to ""', () => {
        expect(service.name).to.equal('');
      });

      it('should default popupUrl to ""', () => {
        expect(service.popupUrl).to.equal('');
      });
    });

    describe('constructor', () => {
      let service = new TestService(utils.extend({}, defaultConfig, {
        buttons: [{ type: 'test', tag: 'span', template: 'Testing!' }]
      }));

      it('should store the options (inheriting defaults)', () => {
        expect(service.options).to.deep.equal({
          url: '',
          tag: 'span',
          id: '',
          class: 'sociare sociare-{network}',
          attrs: {},
          template: 'Testing!',
          type: 'test',
          extras: {}
        });
      });

      it('should include global extras defined for the service in the options', () => {
        let service2 = new TestService(utils.extend({ testExtras: { foo: 'foobar' }}, defaultConfig, {
          buttons: [{ type: 'test', tag: 'span', template: 'Testing!' }]
        }));

        expect(service2.options.extras).to.deep.equal({ foo: 'foobar' });
      });

      it('should set the count to 0', () => {
        expect(service.count).to.equal(0);
      });
    });

    describe('count', () => {
      let service = new TestService(utils.extend({}, defaultConfig, {
        buttons: [{ type: 'test', tag: 'span', template: 'Testing!' }]
      }));

      describe('get', () => {
        it('should abbreviate counts over 1000', () => {
          service.count = 1000;
          expect(service.count).to.equal('1k');

          service.count = 1240;
          expect(service.count).to.equal('1.2k');

          service.count = 1250;
          expect(service.count).to.equal('1.3k');
        });

        it('should abbreviate counts over 1000000', () => {
          service.count = 1000000;
          expect(service.count).to.equal('1M');

          service.count = 1249999;
          expect(service.count).to.equal('1.2M');

          service.count = 1250000;
          expect(service.count).to.equal('1.3M');
        });

        it('should return the count unmodified when under 1000', () => {
          service.count = 999;
          expect(service.count).to.equal(999);

          service.count = 0;
          expect(service.count).to.equal(0);
        });
      });

      describe('set', () => {
        let render;
        beforeEach(() => { render = sinon.spy(service, 'update'); });
        afterEach(() => { render.restore(); });

        describe('before the button has been rendered', () => {
          beforeEach(() => { service.count = 500; });

          it('should update the count', () => {
            expect(service.count).to.equal(500);
          });

          it('should not re-render', () => {
            expect(render).to.not.have.beenCalled;
          });
        });

        describe('after the button has been rendered', () => {
          before(() => { service.generateButton(); });
          beforeEach(() => { service.count = 550; });

          it('should update the count', () => {
            expect(service.count).to.equal(550);
          });

          it('should re-render', () => {
            expect(render).to.have.been.calledOnce;
          });
        });
      });
    });

    describe('parsed_options', () => {
      let service;

      before(() => {
        service = new TestService({
          buttonClass: 'count-{count} network-{network}',
          buttonId: '{network}-{count}',
          buttonAttrs: {
            'network-{network}': 'test-{network}',
            'count-{count}': 'test-{count}',
          },
          buttons: [{
            type: 'test',
            foo: [
              { 'prop-{network}': 'val-{count}' }
            ]
          }]
        });

        service.count = 4;
      });

      it('should replace all instances of "{network}" and "{count}"', () => {
        let options = service.parsed_options;
        expect(options.class).to.equal('count-4 network-test');
        expect(options.id).to.equal('test-4');
        expect(options.attrs).to.deep.equal({
          'network-test': 'test-test',
          'count-4': 'test-4'
        });
        expect(options.foo).to.deep.equal([{ 'prop-test': 'val-4' }]);
      });
    })

    describe('generateButton', () => {
      let service = new TestService({
        buttons: [{
          type: 'test',
          tag: 'span',
          class: 'network-{network} count-{count}',
          id: 'btn-1',
          attrs: {
            'data-network': '{network}',
            'data-count': '{count}'
          },
          template: 'Testing {network} - {count}'
        }]
      });

      it('should return a DOM element', () => {
        let elem = service.generateButton();
        expect(elem.outerHTML).to.equal('<span id="btn-1" class="network-test count-0" data-network="test" data-count="0">Testing test - 0</span>');
      });
    });

    describe('onclick', () => {
      let service = new TestService({
        buttons: [{
          type: 'test',
          tag: 'span',
          class: 'network-{network} count-{count}',
          id: 'btn-1',
          attrs: {
            'data-network': '{network}',
            'data-count': '{count}'
          },
          template: 'Testing {network} - {count}'
        }]
      }),
      elem, open;

      beforeEach(() => {
        service.count = 5;
        elem = service.generateButton();
        open = sinon.stub(window, 'open');
        elem.onclick();
      });

      afterEach(() => { open.restore(); });

      it('should open a popup', () => {
        expect(open).to.have.been.calledOnce;
        expect(open).to.have.been.calledWith('http://test.com', 'test');
      });

      it('should increase the count by 1', () => {
        expect(service.count).to.equal(6);
      });

      it('should re-render the button', () => {
        expect(elem.innerHTML).to.equal('Testing test - 6');
      });
    });
  });
});
