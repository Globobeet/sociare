'use strict';

import AbstractService from './abstract';

export default class Pinterest extends AbstractService {
  get name() { return 'pinterest'; }

  get popupUrl() {
    let url = `http://pinterest.com/pin/create/button/?url=${this.encodedUrl}`;

    if (this.options.extras.media) { url += `&media=${encodeURIComponent(this.options.extras.media)}` }
    if (this.options.extras.description) { url += `&description=${encodeURIComponent(this.options.extras.description)}` }

    return url;
  }
};
