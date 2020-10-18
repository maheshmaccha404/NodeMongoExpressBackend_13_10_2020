const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Category } = require('../models/category');

// => localhost:3000/category/
router.get('/', (req, res) => {
    Category.find((err, docs) => {
        if (!err) { 
            // console.log(docs)
            res.send(docs);
        }
        else { console.log('Error in Retriving category :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Category.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving category :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {    
    var category = new Category({
        name: req.body.name,
        description: req.body.description
    });
    category.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in category Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var category= { 
        name: req.body.name,
        description: req.body.description,
    };
    Category.findByIdAndUpdate(req.params.id, { $set: category }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in category Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in category Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;