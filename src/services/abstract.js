'use strict';

import utils from '../utils.js';

const $options = Symbol('options');

export default class AbstractService {
  get options() { return this[$options]; }
  get name() { return ''; }
  get popupUrl() { return ''; }
  get encodedUrl() { return encodeURIComponent(this.options.url); }

  constructor(config={}) {
    let defaultConfig = {
      url: config.url || '',
      tag: config.buttonTag,
      id: config.buttonId,
      class: config.buttonClass,
      attrs: config.buttonAttrs,
      template: config.buttonTemplate,
      extras: config[`${this.name}Extras`] || {}
    };

    // Grab any config object given for the button type
    let givenConfig = config.buttons.reduce((config, obj) => (obj.type === this.name) ? obj : config, {});

    // Store mixed config, preferring supplied config over default
    this[$options] = utils.extend(defaultConfig, givenConfig);

    // Store count
    this.count = 0;
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

  generateButton(count) {
    // Store the new count
    this.count = count;

    let options = this.parsed_options,
        elem = document.createElement(options.tag);

    // Apply id
    elem.id = options.id;

    // Apply classes
    elem.className = options.class;

    // Apply attributes
    Object.keys(options.attrs).forEach((key) => elem.setAttribute(key, options.attrs[key]));

    // Apply template
    elem.innerHTML = options.template;

    // Bind click event
    elem.onclick = () => {
      // Open the share popup
      let popup_options = 'status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no,width=600,height=600';
      window.open(this.popupUrl, this.name, popup_options);

      // Add 1 to the count
      this.count++;

      // Re-render the inner template
      elem.innerHTML = this.parsed_options.template;

      // Prevent bubbling
      return false;
    };

    return elem;
  }
};
