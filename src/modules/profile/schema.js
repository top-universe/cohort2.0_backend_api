const { v4 } = require('uuid')
const mongoose = require('mongoose')
const auth = require('../auth/schema')

let ProfileSchema = new mongoose.Schema({

    _id:{
        type: String,
        default: v4()
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'auth'
    },
    first_name:{ 
        type: String,
        required: true,
        trim: true

    },
    middle_name:{ 
        type: String,
        trim: true
    },
    last_name:{ 
        type: String,
        required: true,
        trim: true

    },
    country:{ 
        type: String,
        required: true
    },
    location:{ 
        type: String,
        required: true
    },
    phone:{ 
        type: String,
        required: true

    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('UserProfile',ProfileSchema);