class ProfileModel {
    /**
     * Create a new user profile
     * body Object create profile request body (optional)
     * returns inline_response_200
     **/
    createProfile(data) {
        return data
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

module.exports.ProfileModel = ProfileModel
module.exports = class AdminProfileModel extends ProfileModel {
     /**
     * Your GET endpoint
     * Fetch all user profiles
     * authorisation String JWT Bearer Token (optional)
     * returns inline_response_200
     **/
      getProfileUsers(authorisation) {
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
        })
    }
}