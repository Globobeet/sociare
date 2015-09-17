'use strict';

import AbstractService from './abstract';

// https://dev.twitter.com/web/tweet-button/web-intent

export default class Twitter extends AbstractService {
  get name() { return 'twitter'; }
  get popupUrl() {
    let url = `https://twitter.com/intent/tweet?url=${this.encodedUrl}`;

    if (this.options.extras.text) { url += `&text=${encodeURIComponent(this.options.extras.text)}` }
    if (this.options.extras.via) { url += `&via=${this.options.extras.via}` }
    if (this.options.extras.hashtags) { url += `&hashtags=${this.options.extras.hashtags}` }

    return url;
  }
};
