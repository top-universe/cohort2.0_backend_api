const {roleSchema} = require('./schema')

exports.createRole = async (role, email, description) => {
    let Role = {
        role,
        email,
        description
    }
    
    let newRole = new roleSchema(Role)
    return await newRole.save()
}


exports.getRole = async (role, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (user) {
        if (user.role = role)
        {
            return false
        }
    }
    return true
   
}

exports.checkRole = async (role, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (!user) {
        return false
    }

    if (user) {
        if (user.role === role && user.email === email)
        return user
    }

}

exports.validUser = async (id, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (!user) {

        return false
    }

    if (user) {
        if (user._id === id && user.email === email)

        return user
    }

}

exports.delRole = async (id, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (!user) {
        return false
    }

    if (user) {

        if (user._id === id && user.email === email)

        return user
    }

}

//query is the search parameter, data is the details to be updadted
exports.updateUser = async (filter, update) => {
    let user = await roleSchema.findOneAndUpdate(filter, update, {new: true})
 
    return true
}

//query is the search parameter, data is the details to be updadted
exports.roleDel = async (filter, update) => {
    let user = await roleSchema.findOneAndUpdate(filter, update, {new: true});
     return true
}