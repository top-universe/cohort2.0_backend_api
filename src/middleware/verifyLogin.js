require('dotenv').config()
const jwt = require('jsonwebtoken');
const {checkIfUserExists} = require('../helper')

/**
* Verify logged in user middleware
* No value is returned
* @param {Object} req - express default request object
* @param {Object} res - express default response object
* @param {Object} next - express default next function
*/
exports.verifyLogin = async (req, res, next) => {
    // collect authorisation header
    const bearer = req.headers.authorization;

    // check if authorisation header exists
    if (!bearer) {
        res.status(401).json({ message: 'not authorized' })
        return
    }

    // split Bearer string from jwt token
    const [, token] = bearer.split(' ');
    if (!token) {
        res.status(401).json({ message: 'not valid token' })
        return
    }

    try {
        // perform jwt verification
        const user = jwt.verify(token, AppConfig.JWT_SECRET)
        
        // check if the user exists in DB
        const userExists = await checkIfUserExists(user.id)

        // pass the user data into the request object is everything is fine
        req.user = user

        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
        return
    }
}