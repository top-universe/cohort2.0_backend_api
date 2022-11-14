const { CreateBooking, } = require('./model');

exports.createBooking = async (req, res) => {

    const booking = req.body;
    const mybooking = await CreateBooking(booking)

    res.status(200).json(mybooking)
}

exports.getOne = async (req, res) => {
    
}

exports.getAll = async (req, res) => {
    
}

exports.updateOne = async (req, res) => {
    
}

exports.deleteOne = async (req, res) => {
    
}