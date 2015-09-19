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

      it('should update the stored count', () => {
        service.generateButton(15);
        expect(service.count).to.equal(15);
      });

      it('should return a DOM element', () => {
        let elem = service.generateButton(15);
        expect(elem.outerHTML).to.equal('<span id="btn-1" class="network-test count-15" data-network="test" data-count="15">Testing test - 15</span>');
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
        elem = service.generateButton(5);
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
