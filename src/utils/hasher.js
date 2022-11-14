const bcrypt = require('bcryptjs')

exports.hashPassword = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds) 
    return hashedPassword
}

exports.comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}