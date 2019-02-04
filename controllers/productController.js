const db = require("../db/models");

module.exports = {
    findAll: function (req, res) {
        db.Product.find(req.query)
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Product.findById(req.params.id)
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    findByCategory: function (req, res){
        db.Product.find({category: req.params.category})
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    findByTitle: function (req, res){
        let searchQuery = req.params.searchQuery;
        db.Product.find({title: new RegExp(searchQuery, "i")})
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Product.create(req.body)
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Product.findOneAndUpdate({ id: req.params.id }, req.body)
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Product.findById(req.params.id)
            .then(dbProduct => dbProduct.remove())
            .then(dbProduct => res.json(dbProduct))
            .catch(err => res.status(422).json(err));
    }
};