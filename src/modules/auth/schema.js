const { v4 } = require('uuid')
const mongoose = require('mongoose')
const Joi = require('joi');

let schema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => v4()
    },
    email: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
},
    {
        timestamps: true
    }
)

/**
* Signup and login schema
* The return value is a Joi object in all cases.
*/
exports.authValidatorSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] } })
        .lowercase()
        .required(),

    password: Joi.string()
        .min(7)
        .required()
})

/**
* Email schema
* The return value is a Joi object in all cases.
*/
exports.emailValidatorSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] } })
        .lowercase()
        .required()
})

/**
* Password schema
* The return value is a Joi object in all cases.
*/
exports.passwordValidatorSchema = Joi.object().keys({
    newPassword: Joi.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required()
})

/**
* Auth collection mongoose model
* The return value is a Joi object in all cases.
*/
exports.authCollection = mongoose.model('auth', schema)