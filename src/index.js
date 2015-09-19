'use strict';

import utils from './utils.js';
import Twitter from './services/twitter.js';
import Facebook from './services/facebook.js';
import GooglePlus from './services/googleplus.js';
import Pinterest from './services/pinterest.js';
import LinkedIn from './services/linkedin.js';

const $container = Symbol('container');
const $config = Symbol('config');
const $url = Symbol('url');
const $facebook = Symbol('facebook');
const $twitter = Symbol('twitter');
const $pinterest = Symbol('pinterest');
const $linkedin = Symbol('linkedin');
const $googleplus = Symbol('googleplus');

let defaultConfig = {
  getCounts: true,
  noQueryCount: false,
  buttons: [],
  buttonTag: 'a',
  buttonId: '',
  buttonClass: 'sociare sociare-{network}',
  buttonAttrs: {},
  buttonTemplate: 'Share on {network} - {count}',
  twitterExtras: {},
  pinterestExtras: {},
  linkedinExtras: {}
};

export default class Sociare {
  constructor(container, config = {}) {
    this[$container] = container;
    this[$config] = utils.extend({}, defaultConfig, window.SociareConfig, config);

    this[$facebook]   = new Facebook(utils.extend({ url: this.url }, this.config));
    this[$twitter]    = new Twitter(utils.extend({ url: this.url }, this.config));
    this[$pinterest]  = new Pinterest(utils.extend({ url: this.url }, this.config));
    this[$linkedin]   = new LinkedIn(utils.extend({ url: this.url }, this.config));
    this[$googleplus] = new GooglePlus(utils.extend({ url: this.url }, this.config));

    return this;
  }

  get facebook()    { return this[$facebook]; }
  get twitter()     { return this[$twitter]; }
  get pinterest()   { return this[$pinterest]; }
  get linkedin()    { return this[$linkedin]; }
  get googleplus()  { return this[$googleplus]; }

  get container() { return this[$container]; }
  get config() { return this[$config]; }
  get _countUrl() {
    if (!this.config.count_url) {
      throw new Error('config.count_url is required unless config.getCounts is false.');
    }

    return this.config.count_url;
  }
  get _url() { return this.config.url || window.location.href; }

  get _networks() {
    return this.config.buttons.map((obj) => obj.type || obj);
  }

  _getCounts() {
    let blank = this._networks.reduce((obj, network) => {
      obj[network] = 0;
      return obj;
    }, {});

    // Auto-set counts to 0 if we're not using them
    if (!this.config.getCounts) {
      return Promise.resolve(blank);
    }

    let url = `${this._countUrl}?url=${this._url}&networks=${this._networks.join(',')}`;

    // Indicate if the query string should be included
    if (this.config.noQueryCount) { url += '&stripQuery=true'; }

    return utils.request(url)
      .catch(err => {
        console.error('[Sociare Error]', err);
        return blank;
      });
  }

  _renderButtons(counts) {
    this._networks.forEach((network) => {
      this.container.appendChild(this[network].generateButton(counts[network]));
    });
  }

  render() {
    return this._getCounts()
      .then(this._renderButtons.bind(this))
      .catch((err) => {
        console.error('[Sociare Error]', err);
      });
  }
};

window.Sociare = Sociare;
