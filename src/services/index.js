const Postmark = require('./Mail/Postmark')
const Mailgun = require('./Mail/Mailgun')
const {RequestService} = require('./RequestService')

global.MailService = Postmark
global.RequestService = RequestService