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
  static async call(method, url, data, headers) {
    const options = { method, url, headers, data };
    try {
      return await axios.request(options);
    } catch (err) {
      console.log(err)
      // throw new Error(err)
    }
  }
}


// let data = { email: "solomonmarvel@hotmail.com", password: "abcd12345"}
// RequestService.call('POST', "http://localhost:3000/signup", data).then(response => {
//   console.log(response.data)
// })