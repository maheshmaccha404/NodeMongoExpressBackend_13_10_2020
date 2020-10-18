const mongoose = require('mongoose');

var Category = mongoose.model('Category', {
    name: { type: String },
    description: { type: String},
});

module.exports = { Category };