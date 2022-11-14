
exports.facilityController = {
    createFacilityProfile (req, res) {
        FacilityProfile.createFacilityProfile(authorisation)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      },
      
      deleteFacilityProfile (req, res) {
        FacilityProfile.deleteFacilityProfile(id, authorisation)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      },
      
      getProfileFacilities (req, res) {
        FacilityProfile.getProfileFacilities(authorisation)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      },
      
      getProfileFacilityId (req, res) {
        FacilityProfile.getProfileFacilityId(id, authorisation)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      },
      
      patchFacilityProfile (req, res) {
        FacilityProfile.pathFacilityProfile(action, id, authorisation)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      }
}