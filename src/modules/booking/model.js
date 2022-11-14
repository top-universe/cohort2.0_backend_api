const { createNewBooking } = require('./repository');

module.exports = class Booking {

    static async CreateBooking(data) {
        return await createNewBooking(data)
    }

    static async getBooking() {

    }

    static async getAllBookings() {

    }

    static async updateBooking(id, data) {

    }

    static async deleteBooking() {

    }

}