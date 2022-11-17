// repository
const {ProfileCollection} = require('../schema');


exports.createUserProfile = async (data ) => {
    try {
        let newProfile = new ProfileCollection(data)
        await newProfile.save()
        //filter result
        return {
            id: newProfile._id,
            firstName: newProfile.firstName,
            middleName:newProfile.middleName,
            lastName: newProfile.lastName,
            country:newProfile.country,
            location:newProfile.location,
            phone:newProfile.phone
        }
    } catch (error) {
        throw new Error('Could not save profile')
    }
}

exports.checkIfProfileExists = async (userId) => {
    let profile = await ProfileCollection.findOne({ user: userId })
    if (profile) {
        throw new Error('Profile already Exit')
    }
}

exports.getUserProfile = async (userId) => {
    let profile = await ProfileCollection.findOne({ user: userId })
    if (!profile) {
        throw new Error('Profile Does not exist')
    } else {
        return profile
    }
}

exports.updateProfile = async (id, data) => {
}

exports.deleteProfile = async (id ) => {
}