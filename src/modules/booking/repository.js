// repository
const Booking = require('./schema')

exports.getBooking = async (email) => {
    return await Booking.findOne({ email })
}

exports.updateBooking = async (filter, update) => {
    await Booking.findByIdAndUpdate(bookingId, update);
}

exports.createNewBooking = async ({name,
    email,
    phone,
    medical_facility,
    location}) => {
    let booking = {
        name,
        email,
        phone,
        medical_facility,
        location
        
    }
    
    let newBooking = new Booking(booking)
    newBooking.save().exec(error => {
        throw new error('Booking not created')
    })
    //filter result
    return newBooking;
}


exports.deleteBooking = async (id ) => {}