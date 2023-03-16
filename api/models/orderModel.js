const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    quantity: Array,
    user: {
        type: String,
        required: true
    },
    date: Date
})

const Order = new mongoose.model('Order', orderSchema)
module.exports = Order