const userProfileRepository = require('../repository/userProfileRepository')

class ProfileModel {
    /**
     * Create a new user profile
     * body Object create profile request body (optional)
     * returns inline_response_200
     **/
     static async createUserProfile(data) {
            return await userProfileRepository.createUserProfile(data)
    }

    static async checkIfProfileExists(userId) {
            return await userProfileRepository.checkIfProfileExists(userId)
    }

    static async getUserProfile(userId) {
        return await userProfileRepository.getUserProfile(userId)
    }

    /**
     * Your GET endpoint
     * Get a single user profile
     * id String 
     * returns inline_response_200
     **/
    getProfileUserId(id) {
        return new Promise(function (resolve, reject) {
            var examples = {};
            examples['application/json'] = {
                "data": {},
                "message": "message",
                "status": 0.8008281904610115
            };
            if (Object.keys(examples).length > 0) {
                resolve(examples[Object.keys(examples)[0]]);
            } else {
                resolve();
            }
        });
    }

    /**
     * Update a single user profile
     *
     * body Object update profile request body (optional)
     * no response value expected for this operation
     **/
    putProfileUser(body) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    }
}

class AdminProfileModel extends ProfileModel {
    static async getAllUserProfiles() {
        return await userProfileRepository.getAllUserProfiles()
    }
    
}

module.exports = {
    ProfileModel,
    AdminProfileModel
}