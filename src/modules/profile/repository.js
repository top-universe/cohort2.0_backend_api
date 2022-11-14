// repository
const {authSchema} = require('../auth/schema');
const Profile = require('./schema');

// get user profile using 
exports.getUserProfile = async (user) => {
    let profile =  await Profile.findOne(user);
    if(profile) {
        return res.status(200).json({profile});
     } 

     return res.json({
        data: user,
        message: 'Profile does not exit'
       });
}


exports.createNewProfile = async (data ) => {
    let newUserProfile = new Profile(data)
    await newUserProfile.save()
    //filter result
    return {
        id: newUserProfile._id,
        first_name: newUser.first_name,
        middle_name:newUser.middle_name,
        last_name: newUser.last_name,
        country:newUser.country,
        location:newUser.location,
        phone:newUser.phone
    }

}

exports.updateProfile = async (id, data) => {
    let profile =  await Profile.findByIdAndUpdate( id, data);

    if(profile) {
        return res.status(200).json({
            data: profile,
            message: 'Profile has been updated'
           });
     } 

     return res.json({
        data: user,
        message: 'Profile does not exit'
       });
}

exports.deleteProfile = async (id ) => {
    let profile =  await Profile.findByIdAndDelete( id);
    
    if(profile) {
        return res.status(200).json({
            message: 'Profile has been deleted'
           });
     } 

     return res.json({
        data: user,
        message: 'Profile id does not exit'
       });
}