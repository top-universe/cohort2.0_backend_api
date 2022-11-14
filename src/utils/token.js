const jwt = require('jsonwebtoken')
const SECRET = AppConfig.JWT_SECRET
const HOST = AppConfig.HOST

module.exports = {
    // generate jwt token with epiry date set to 10 days
    generateToken  : async(user) => {
        console.log(user)
        token = jwt.sign(user, SECRET, {expiresIn: "10 days"}) //token expires in 10 days
        return token
    },
    
    // generate email verification link when verify a newly created account
    generateEmailVerificationLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        verificationLink = `${HOST}/verify/${link}`
        return verificationLink
    },

    // verify jwt => returns embeded user object if links is still active
    verifyLink: async (link) => {
        let isValid = jwt.verify(link, SECRET )
        if(isValid) return isValid
    },

    // generate password reset link for reseting user password
    generatePasswordResetLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        return `${AppConfig.FRONTEND_HOST}/auth/passwordReset/${link}`
    },

    // generate update role reset link for updating user role
    generateUpadateResetLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        verificationLink = `${HOST}/role/update/${link}`
        return verificationLink
    },

    // generate delete role link for deleting user role
    generateDeleteRoleLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        verificationLink = `${HOST}/role/delete/${link}`
        return verificationLink
    }

}
