const userProfileModel = require('../model/userProfileModel')


exports.userProfileController = {
  async createUserProfile(req, res) {
    try {
      // collect validated object from req is json object was valid
      let data = req.data

      // collect user id from req object
      let userId = req.user.id
      data.value.user = userId

      // verifyIfProfileAlreadyExists()
      await userProfileModel.checkIfProfileExists(userId)

      // call the userProfileModel
      await userProfileModel.createUserProfile(data.value)

      // send success message
      res.status(201).json({
        message: "Created",
        data: newProfile
      })
    }
    catch (err) {
      res.status(400).json({ error: err.message })
    }
  },


  async getUserProfile(req, res) {
    try {
      let userId = req.params.id

      if (req.user.id !== req.params.id) 
      throw new Error('access denied')

      // verifyIfProfileAlreadyExists()
      let userProfile = await userProfileModel.getUserProfile(userId)
      res.status(200).json(userProfile)
    }catch(err) {
      res.status(404).json({ error: err.message })
    }
  },

  getProfileUsers(req, res) {
    res.send('done')
  },

  updateUserProfileUser(req, res) {
    res.send('done')
  },

}