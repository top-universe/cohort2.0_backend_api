const { createRole, getRole, getAllRoles, checkRole, validUser, updateUser, roleDel, delRole } = require('./repository')
const {  generateUpadateResetLink, generateDeleteRoleLink} = require('../../utils/token')


module.exports = class Role {
    static async createRole (role, email, description) {
            const existingRole = await Role.checkRole(role, email)
            if (!existingRole){
                throw new Error("User with he same Role already exists")
            }
            
            return await createRole(role, email, description)
    }

    static async checkRole(role, email) {
        let user = await getRole( role, email ) 
        if (user) {
            return true
        }
        return false
    }

    static async getAllRoles() {
        return await getAllRoles()
    }

    static async verifyRole(role, email) {
        let user = await checkRole( role, email ) 
        if (!user) {
            return false
        }
        return user
    }

    static async validateUser(id, email) {
        let user = await validUser( id, email ) 
        if (user) {
           const payload = {
                id: user._id,
                email: user.email
            }
            let upadateResetLink = await generateUpadateResetLink(payload)
            let mailData = {
                to: user.email,
                subject: "Update Reset Link",
                body: upadateResetLink
            }
             await MailService.send(mailData)
            return true
        }
        return false
    }

    static async deletRole(id, email) {
        let user = await delRole( id, email ) 

        if (user) {
           const payload = {
                id: user._id,
                email: user.email
            }
            let deletRoleLink = await generateDeleteRoleLink(payload)
            
            let mailData = {
                to: user.email,
                subject: "",
                body: deletRoleLink
            }
             await MailService.send(mailData)
            return true
        }
        return false
    }


    //query is the search parameter, data is the details to be updadted
       static async updateUser(filter, update){
        
        return await updateUser(filter, update)
    }

       //query is the search parameter, data is the details to be updadted
       static async roleDelete(filter, update){
        
        return await roleDel(filter, update)
    }
}