'use strict';

import AbstractService from './abstract';

// https://developers.google.com/+/web/share/#sharelink

export default class GooglePlus extends AbstractService {
  get name() { return 'googleplus'; }
  get popupUrl() { return `https://plus.google.com/share?url=${this.encodedUrl}`; }
};
