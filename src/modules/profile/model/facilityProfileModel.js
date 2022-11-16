exports.facilityProfileModel = {

    /**
     * Create a facility profile
     * returns inline_response_200
     **/
    createFacilityProfile(authorisation) {
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
    },


    /**
     * Delete facility profile using facility id
     * id String 
     * returns inline_response_200
     **/
    deleteFacilityProfile(id, authorisation) {
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
    },


    /**
     * Your GET endpoint
     * Fetch all facility profiles
     * returns inline_response_200
     **/
    getProfileFacilities(authorisation) {
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
    },


    /**
     * Your GET endpoint
     * Get a single facility profile
     * id String 
     * returns inline_response_200
     **/
    getProfileFacilityId(id) {
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
    },


    /**
     * Perform series of operations on a facility ranging from \"suspend\", \"enable\" & \"disable\" operations.
     * action String 
     * id String 
     * returns inline_response_200
     **/
    patchFacilityProfile(action, id) {
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
}