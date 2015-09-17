export default {
  /**
   * Sends XHR "get" request & returns a promise
   *
   * @param  {String} url   Url to request
   * @return {Promise}
   */
  request: function (url) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();

      req.open('GET', url, true);

      req.onload = () => {
        if (req.status >= 200 && req.status < 400) {
          return resolve(JSON.parse(req.responseText));
        } else {
          return reject(JSON.parse(req.responseText));
        }
      };

      req.onerror = () => {
        return reject(`Unable to connect to ${url}: ${req.responseText}`);
      }

      req.send();
    });
  },

  /**
   * Extends n objects from right to left
   *
   * @param  {Object} out Destination object
   * @return {Object}     Extended destination object
   */
  extend: function (out={}, ...rest) {
    rest.unshift(out);
    return Object.assign.apply(this, rest);
  }
};
