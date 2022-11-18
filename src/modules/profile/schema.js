const { v4 } = require('uuid')
const mongoose = require('mongoose')
const Joi = require('joi');


let ProfileSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => v4()
    },
    user: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String
    },

    LGA: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String

    },
    status: {
        type: String,
    },
},
    {
        timestamps: true
    }
)

exports.ProfileCollection = mongoose.model('UserProfile', ProfileSchema);


exports.profileValidatorSchema = Joi.object().keys({
    firstName: Joi.string().lowercase().required(),
    middleName: Joi.string().lowercase(),
    lastName: Joi.string().lowercase().required(),
    state: Joi.string().lowercase(),
    LGA: Joi.string().lowercase(),
    phoneNumber: Joi.string().lowercase().required(),
})