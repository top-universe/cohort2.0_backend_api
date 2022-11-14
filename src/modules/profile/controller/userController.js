const {userProfileModel} = require('../model')

exports.userController = {
    createProfile (req, res) {
      userProfileModel.createProfile(body, authorisation)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    },
    
    getProfileUserId (req, res) {
      UserProfile.getProfileUserId(id, authorisation)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    },
    
    getProfileUsers (req, res) {
      UserProfile.getProfileUsers(authorisation)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    },
    
    putProfileUser (req, res) {
      UserProfile.putProfileUser(body, authorisation)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    },
    
}