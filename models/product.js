const mongoose = require('mongoose');

// var Product = mongoose.model('Product', {
//     product_name: { type: String },
//     quantity: { type: Number },
//     category: { type: Array },
//     price: { type: Number }
// });


var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var conn = mongoose.Collection;
var productSchema =new mongoose.Schema({
    product_name : String,
    quantity: { type: Number },
    category: { type: Array },
    price: { type: Number }
});
productSchema.plugin(mongoosePaginate);
var Product = mongoose.model('Product', productSchema);




module.exports = { Product };