const { v4 } = require('uuid')
const mongoose = require('mongoose')

let bookingSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: v4()
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{ 
        type: String,
        required: true,
        trim: true

    },
    phone:{ 
        type: String,
        required: true
    },
    medical_facility: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
       }
},
{
    timestamps: true
}
)

exports.bookingModel = mongoose.model('Booking', bookingSchema)