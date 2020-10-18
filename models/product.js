const mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    product_name: { type: String },
    quantity: { type: Number },
    category: { type: String },
    price: { type: Number }
});

module.exports = { Product };