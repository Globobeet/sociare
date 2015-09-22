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
  countUrl: '',
  noQueryCount: false,
  buttonTag: 'a',
  buttonId: '',
  buttonClass: 'sociare sociare-{network}',
  buttonAttrs: {},
  buttonTemplate: 'Share on {network} - {count}',
  twitterExtras: {},
  pinterestExtras: {},
  linkedinExtras: {},
  buttons: [],
};

export default class Sociare {
  constructor(container, config = {}) {
    this[$container] = container;
    this[$config] = utils.extend({}, defaultConfig, window.SociareConfig, config);

    let serviceConfig = utils.extend({}, this.config, { url: this._url });

    this[$facebook]   = new Facebook(serviceConfig);
    this[$twitter]    = new Twitter(serviceConfig);
    this[$pinterest]  = new Pinterest(serviceConfig);
    this[$linkedin]   = new LinkedIn(serviceConfig);
    this[$googleplus] = new GooglePlus(serviceConfig);

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
    if (!this.config.countUrl) {
      throw new Error('config.count_url is required unless config.getCounts is false.');
    }

    return this.config.countUrl;
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
    if (this.config.noQueryCount) { url += '&omitQuery=true'; }

    return utils.request(url)
      .catch(err => {
        console.error('[Sociare Error]', err);
        return blank;
      });
  }

  _renderButtons() {
    this._networks.forEach((network) => {
      this.container.appendChild(this[network].generateButton());
    });
  }

  render() {
    this._renderButtons();

    return this._getCounts()
      .then(counts => {
        Object.keys(counts).forEach(key => this[key].count = counts[key]);
      })
      .catch(err => {
        console.error('[Sociare Error]', err);
      });
  }
};

window.Sociare = Sociare;
