'use strict';

import utils from '../utils.js';

const $options = Symbol('options');
const $count = Symbol('count');
const $rendered = Symbol('rendered');

export default class AbstractService {
  get options() { return this[$options]; }
  get name() { return ''; }
  get popupUrl() { return ''; }
  get encodedUrl() { return encodeURIComponent(this.options.url); }
  get rendered() { return this[$rendered]; }

  constructor(config) {
    let defaultConfig = {
      url: config.url || '',
      tag: config.buttonTag,
      id: config.buttonId,
      class: config.buttonClass,
      attrs: config.buttonAttrs,
      template: config.buttonTemplate,
      preHook: config.buttonPreHook,
      postHook: config.buttonPostHook,
      extras: config[`${this.name}Extras`] || {}
    };

    // Grab any config object given for the button type
    let givenConfig = config.buttons.reduce((config, obj) => (obj.type === this.name) ? obj : config, {});

    // Store mixed config, preferring supplied config over default
    this[$options] = utils.extend(defaultConfig, givenConfig);

    // Store count
    this.count = 0;

    this[$rendered] = false;
  }

  get count() {
    let count = this[$count];

    if (count >= 1000000) {
      return (count/1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (count >= 1000) {
      return (count/1000).toFixed(1).replace('.0', '') + 'k';
    } else {
      return count;
    }
  }

  set count(count) {
    this[$count] = count;
    if (this.rendered) { this.update(); }
  }

  get parsed_options() {
    let count = this.count,
        name = this.name;

    function replace_tokens(input) {
      return input.replace(/\{count\}/g, count).replace(/\{network\}/g, name);
    }

    function replace_all_tokens(node) {
      switch(Object.prototype.toString.call(node)) {
        case '[object Array]': return node.map(item => replace_all_tokens(item));
        case '[object Object]':
          return Object.keys(node).reduce((res, key) => {
            res[replace_tokens(key)] = replace_all_tokens(node[key]);
            return res;
          }, {});
        case '[object String]': return replace_tokens(node);
        default: return node;
      }
    }

    return replace_all_tokens(utils.extend({}, this.options));
  }

  generateButton() {
    let options = this.parsed_options;

    this.elem = document.createElement(options.tag)

    // Apply id
    this.elem.id = options.id;

    // Apply classes
    this.elem.className = options.class;

    // Apply attributes
    Object.keys(options.attrs).forEach((key) => this.elem.setAttribute(key, options.attrs[key]));

    // Apply template
    this.elem.innerHTML = options.template;

    // Bind click event
    this.elem.onclick = (event) => {
      let popup_options = 'status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no,width=600,height=600',
          noop = function (cb) { if (cb) { return cb(); } },
          pre = this.options.preHook || noop,
          post = this.options.postHook || noop;

      // Prevent bubbling
      event.stopPropagation();

      pre(function (err) {
        if (err) { return console.error('[Sociare Error]', err); }

        // Open the share popup
        window.open(this.popupUrl, this.name, popup_options);

        // Add 1 to the count
        this.count = this[$count] + 1;

        post();
      }.bind(this));
    };

    // Mark it as rendered
    this[$rendered] = true;

    return this.elem;
  }

  update() {
    // Re-apply template
    this.elem.innerHTML = this.parsed_options.template;
  }
};
