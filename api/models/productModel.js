const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    inStock: Boolean
})

const Product = new mongoose.model('Product', productSchema)
module.exports = Product