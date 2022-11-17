// Require:
var postmark = require("postmark");

module.exports = class Postmark {
  /**
   * call takes a data object arguments
   * The return value is an object in all cases.
   * @param {Object} data - Describes the mail object containing (to, subject, text)
   * @param {string} data.to - Describes the receivers email
   * @param {string} data.subject - Describes the email subject
   * @param {string} data.text - Describes the email text body
   * @param {string} [data.html] - Describes the email optional html body
   */
  static async send(data) {
    try {
    // Send an email:
    // var client = new postmark.ServerClient(AppConfig.POSTMARK_API_KEY);
    var client = new postmark.ServerClient('xxxxxxxx');
    await client.sendEmail({
        "From": "beep@topuniverse.org",
        "To": data.to,
        "Subject": data.subject,
        "TextBody": data.body,
        "MessageStream": "outbound"
      })
    }catch(err){ console.log(err)};
  }
}