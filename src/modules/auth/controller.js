const Auth = require('./model'),
    { validator } = require('../../utils/validator'),
    { authValidatorSchema, emailValidatorSchema, passwordValidatorSchema } = require('./schema'),
    { verifyLink, generatePasswordResetLink } = require('../../utils/token'),
    { hashPassword, comparePasswords } = require('../../utils/hasher'),
    { createJWT } = require('../../utils/helper')


/**
   * Controller for creating a new user account
   * The return value is an http status code, status message and an optional data object
   * @param {Object} req - Describes the default express request object
   * @param {Object} res - Describes the default express response object
   */
exports.signup = async (req, res) => {
    try {
        //validate user inputs
        let data = await validator(req.body, authValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        let { email, password } = data.value

        let newUser = await Auth.createUser(email, password)
        // send success message
        res.status(200).json({
            message: "Verification mail sent successfully",
            data: newUser
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


/**
    * Controller for verifying a newly created account
    * The return value is an http status code, status message and an optional data object
    * @param {Object} req - Describes the default express request object
    * @param {Object} res - Describes the default express response object
    */
exports.verifyMail = async (req, res) => {
    let verificationLink = req.params.link

    try {
        let user = await verifyLink(verificationLink)
        if (!user) {
            throw new Error("Link expired")
        }

        //update account status
        let { email } = user
        let updated = await Auth.updateUser({ email }, { status: "active" })
        console.log(updated)

        res.status(200).json({
            message: "Account verified"
        })
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

/**
    * Controller for signing into an existing account
    * The return value is an http status code, status message and an optional data object
    * @param {Object} req - Describes the default express request object
    * @param {Object} res - Describes the default express response object
    */
exports.signin = async (req, res) => {
    let { email, password } = req.body

    try {
        email = email.toLowerCase()
        let user = { email, password }

        //validate user inputs
        let data = await validator(user, authValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        //check user credentials
        user = await Auth.getUser(email)
        if (!user) {
            throw new Error("Wrong password or email combination")
        }

        let hashedPassword = user.password
        let compared = await comparePasswords(password, hashedPassword)
        if (!compared) {
            throw new Error("Wrong password or email combination")
        }

        //filter result from db
        user = {
            id: user._id,
            email: user.email
        }

        const token = createJWT(user)

        res.status(200).json({ user, token })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

/**
    * Controller for signing out of an account & clearing the http cookie
    * The return value is an http status code, status message and an optional data object
    * @param {Object} req - Describes the default express request object
    * @param {Object} res - Describes the default express response object
    */
exports.signout = async (req, res) => {
    //clear cookies
    res.clearCookie('jwt')
}

/**
    * Controller for requesting to change a user password
    * The return value is an http status code, status message and an optional data object
    * @param {Object} req - Describes the default express request object
    * @param {Object} res - Describes the default express response object
    */
exports.forgetPassword = async (req, res) => {
    let { email } = req.body

    try {
        //validate user inputs
        let data = await validator(req.body, emailValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        // find email on the db
        let user = await Auth.getUser(email)
        if (user) {
            let userData = {
                id: user._id,
                email: user.email
            }

            // compose password reset link data
            let mailData = {
                to: userData.email,
                subject: "Password Reset Mail",
                body: await generatePasswordResetLink(userData)
            }

            // send password reset email if email is found in database record
            MailService.send(mailData)
        }

        res.status(200).json({
            message: `We will send a password reset magic link to ${req.body.email} if the record exist`
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

/**
    * Controller for actually reseting the password after verifying link from the user
    * The return value is an http status code, status message and an optional data object
    * @param {Object} req - Describes the default express request object
    * @param {Object} res - Describes the default express response object
    */
exports.resetPassword = async (req, res) => {
    try {
        // validates if password meets our set requirement
        let data = await validator(req.body, passwordValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        //accept the password reset link from the route param
        let passwordResetLink = req.params.link

        // accept new password from json body
        let { newPassword } = req.body

        // check the validity of the password reset link
        let user = await verifyLink(passwordResetLink)
        if (!user) {
            throw new Error("Link expired")
        }

        let { email } = user
        //hash new password
        let hashedPassword = await hashPassword(newPassword)

        //update and save new password
        await Auth.updateUser(email, { password: hashedPassword })

        res.status(200).json({
            success: "password reset successful"
        })
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}