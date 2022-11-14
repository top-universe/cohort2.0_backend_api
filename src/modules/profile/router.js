const profileRouter = require('express').Router()
const {userController, facilityController} = require('./controller')
const { grantAccess, allowIfLoggedin } = require('../../utils/helper')

// user
// profileRouter.post('/profile/user', userController.createProfile)


// facility
// profileRouter.post('/profile/facility', facilityController.createFacilityProfile)

module.exports = profileRouter