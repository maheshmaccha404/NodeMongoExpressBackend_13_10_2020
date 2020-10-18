const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/product');
var { Category } = require('../models/category');

// => localhost:3000/product/
router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) { 
            // console.log(docs)
            res.send(docs);
        }
        else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/1', (req, res) => {
    Category.find((err, docs) => {
        if (!err) { 
            // console.log(docs)
            res.send(docs);
        }
        else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {    
    var product = new Product({
        product_name: req.body.product_name,
        quantity : req.body.quantity,
        category: req.body.category,
        price: req.body.price,
    });
    product.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var product= { 
        product_name: req.body.product_name,
        quantity : req.body.quantity,
        category: req.body.category,
        price: req.body.price,
    };
    Product.findByIdAndUpdate(req.params.id, { $set: product }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;