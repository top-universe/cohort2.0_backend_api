const Repository = require('./repository')
const { hashPassword } = require('../../utils/hasher')
const Utils = require('../../utils/token')

module.exports = class Auth {
    /**
    * Create a new user account
    * The return value is a database user response object in all cases.
    * @param {string} email - Describes the user email
    * @param {string} password - Describes the user password
    */
    static async createUser(email, password) {
        // check if user exists
        let userExists = await Repository.getUser(email)
        if (userExists) {
            throw new Error("User already exists")
        }

        //hash password
        let hashedPassword = await hashPassword(password)

        //save details to database
        let user = await Repository.createNewUser(email, hashedPassword)

        //generate verification email
        let verificationLink = await Utils.generateEmailVerificationLink(user)

        // compose mail object
        let mailData = {
            to: user.email,
            subject: "Account Created Successfully",
            body: verificationLink
        }
        // send email
        await MailService.send(mailData)
    }

    /**
    * Create a new user profile
    * The return value is a database profile response object in all cases.
    * @param {Object} profileObj - Describes the profile object
    */
    static async createUserProfile(profileObj) {
        let userprofileExists = await getUserProfile(profileObj._Id)
        if (!userprofileExists) {
            let user = await Repository.createNewUser(profileObj)
            return res.json.status(201).json({ message: 'User Profile Created!', user })
        } else {
            throw new Error("User already exists")
        }
    }

    /**
    * Get a user using email as key
    * The return value is a database auth response object in all cases.
    * @param {string} email - Describes the user email
    */
    static async getUser(email) {
        return await Repository.getUser(email)
    }

    /**
    * Get a single user profile using userId as search key
    * This returns a database profile response object in all cases
    * @param {string} userId - Describes the filter Object
    */
    static async getUserProfile(userId) {
        return await Repository.getUser(userId)
    }

    /**
    * Updates a single profile data using the filter object as an indexing key
    * This returns a database profile response object in all cases
    * @param {Object} filter - Describes the filter Object
    * @param {Object} update - Describes the data Object to replace the profile data
    */
    static async updateUser(filter, update) {
        return await Repository.updateUser(filter, update)
    }

    /**
    * Delete a user using userId as indexing key
    * This returns a database user response object in all cases
    * @param {string} userId - Describes the filter string
    */
    static async deleteUser(userId) {
        return await Repository.deleteUser(userId)
    }
}