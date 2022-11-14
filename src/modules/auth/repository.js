const { authCollection } = require('./schema')

/**
* Get a single user from database using email address as key
* The return value is a mongodb object in all cases.
* @param {string} email - Describes the user email
*/
exports.getUser = async (email) => {
    return await authCollection.findOne({ email })
}

/**
* Fetch user profile using userId as search key
* The return value is a mongodb object in all cases.
* @param {string} userId - Describes the userId used for fetching the user profile
*/
exports.getUserProfile = async (userId) => {
    return await authCollection.findOne({ userId })
}

/**
* Update user profile using filter object as search key and update object as replacement value
* The return value is a mongodb object in all cases.
* @param {Object} filter - Describes the filter Object used for indexing the value that should be changed
* @param {Object} update - Describes the new object that would replace or update the previous object
*/
exports.updateUser = async (filter, update) => {
    const user = await authCollection.findOneAndUpdate(filter, update);
    if (!user) {
        throw new Error('User does not exit')
    }
    return user
}

/**
* Create a new user using email and password as arguments
* The return value is a mongodb object in all cases.
* @param {string} email - Describes the email value passed to the database
* @param {string} password - Describes the hashed password value passed to the database
*/
exports.createNewUser = async (email, password) => {
    try {
        let user = {
            email,
            password
        }
        let newUser = new authCollection(user)
        newUser.save()
        //filter result
        return {
            id: newUser._id,
            email: newUser.email
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

/**
* Create a new profile after account creation
* The return value is a mongodb object in all cases.
* @param {Object} profileObject - Describes the profileObject value passed to the database
*/
exports.createNewProfile = async (profileObj) => {
    let newUserProfile = new profileSchema(profileObj)
    newUserProfile.save()
    //filter result
    return {
        id: newUserProfile._id,
        first_name: newUser.first_name,
        middle_name: newUser.middle_name,
        last_name: newUser.last_name,
        country: newUser.country,
        location: newUser.location,
        phone: newUser.phone
    }
}

/**
* Delete a user using id as search criteria
* The return value is a mongodb object in all cases.
* @param {string} id - Describes the user id (uuid) value used for identifying the user to delete
*/
exports.deleteNewUser = async (id) => {
    return authCollection.findOneAndRemove({_id: id })
}