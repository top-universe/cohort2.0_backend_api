const profileRouter = require('express').Router()
const { verifyLogin } = require('../../middleware/verifyLogin')
const { userProfileController } = require('./controller/userProfileController')

// data validations
const { profileValidatorSchema } = require('./schema')
const { validateJsonBody } = require('../../middleware/validateJsonBody')


// user
profileRouter.post('/profile/user', verifyLogin, validateJsonBody(profileValidatorSchema), userProfileController.createUserProfile)
profileRouter.put('/profile/user', userProfileController.updateUserProfileUser)


// facility
// profileRouter.post('/profile/facility', facilityController.createFacilityProfile)

module.exports = profileRouter