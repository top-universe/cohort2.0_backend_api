const formData = require('form-data'),
  Mailgun = require('mailgun.js'),
  mailgun = new Mailgun(formData),
  mg = mailgun.client({
    username: 'api',
    key: AppConfig.MAILGUN_API_KEY,
    url: "https://api.mailgun.net",
  });

module.exports = class Mailgun {
  /**
   * call takes a data object arguments
   * The return value is an object in all cases.
   * @param {Object} data - Describes the mail object containing (to, subject, body)
   * @param {string} data.to - Describes the receivers email
   * @param {string} data.subject - Describes the email subject
   * @param {string} data.body - Describes the email text body
   * @param {string} [data.html] - Describes the email optional html body
   */
  static async send(data) {
    await mg.messages.create('boltcliq.com', {
      from: "MedBookly <noreply@boltcliq.com>",
      to: data.to,
      subject: data.subject,
      text: data.body
    })
    .catch(err => { throw new Error(err) });
  }
}