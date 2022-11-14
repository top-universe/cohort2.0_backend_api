const jwt = require('jsonwebtoken')
/**
* Verify logged in user middleware
* No value is returned
* @param {Object} req - express default request object
* @param {Object} res - express default response object
* @param {Object} next - express default next function
*/
exports.verifyLogin = (req, res, next) => {
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

    // perform jwt verification
    try {
        const user = jwt.verify(token, AppConfig.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: "session expired" })
        return
    }
}
