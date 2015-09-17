'use strict';

import AbstractService from './abstract';

// https://developer.linkedin.com/docs/share-on-linkedin

export default class LinkedIn extends AbstractService {
  get name() { return 'linkedin'; }

  get popupUrl() {
    let url = `https://www.linkedin.com/shareArticle?mini=true&url=${this.encodedUrl}`;

    if (this.options.extras.title) { url += `&title=${encodeURIComponent(this.options.extras.title)}` }
    if (this.options.extras.summary) { url += `&summary=${encodeURIComponent(this.options.extras.summary)}` }
    if (this.options.extras.source) { url += `&source=${this.options.extras.source}` }

    return url;
  }
};
