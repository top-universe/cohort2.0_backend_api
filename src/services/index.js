const {Postmark, Mailgun} = require('./Mail')
const {RequestService} = require('./RequestService')

global.MailService = Postmark
global.RequestService = RequestService