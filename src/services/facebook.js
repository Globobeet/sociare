'use strict';

import AbstractService from './abstract';

export default class Facebook extends AbstractService {
  get name() { return 'facebook'; }
  get popupUrl() { return `http://www.facebook.com/sharer.php?u=${this.encodedUrl}`; }
};
