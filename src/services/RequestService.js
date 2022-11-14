const axios = require("axios");

module.exports = class RequestService {
/**
 * call takes four arguments
 * The return value is an axios response object in all cases.
 * @param {string} action - Describes the http verb string
 * @param {string} uri - Describes the url path
 * @param {Object} [data] - Describes the optional json body 
 * @param {Array} [headers] - An optional header array that is a string
 */
  static async call(method, uri, data, headers) {
    const options = { method, url, headers, data };
    try {
      return await axios.request(options);
    } catch (err) {
      throw new Error(err)
    }
  }
}