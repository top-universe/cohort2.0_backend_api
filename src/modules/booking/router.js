const bookingRouter = require('express').Router()
const { createBooking } = require('../booking/controller')

bookingRouter.post('/auth/booking/:id', createBooking)

module.exports = bookingRouter