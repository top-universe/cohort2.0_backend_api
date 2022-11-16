const authRouter = require('express').Router()
const { signup, verifyMail, signin, forgetPassword, resetPassword} = require('./controller')

// Add access to profile
const { grantAccess, allowIfLoggedin } = require('../../utils/helper')

// middleware
const {verifyLogin} = require('../../middleware/verifyLogin')
const { verifyRoles } = require('../../middleware/checkRole')
const { upload } = require('../../middleware/upload')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/verify/:link', verifyMail)
authRouter.post('/forget', forgetPassword)
authRouter.post('/reset/:link', resetPassword)

// used primarily for testing middlewares
authRouter.get('/try', verifyLogin, function (req, res) {
    console.log(req.files)
    res.send('done testing')
})


module.exports = authRouter