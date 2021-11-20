const express = require('express');

let authorController = require('../controllers/AuthorController')

let author = express.Router();

    author.route('/author')
        .get(authorController.readAll);

    author.route('/author/:id') // author/1235?idautor=456
        .get(authorController.readById);

    author.route('/author')
        .post(authorController.create);
    
    author.route('/author/:id')
        .delete(authorController.deleteOne);
    
    author.route('/author')
        .delete(authorController.deleteAll);

    author.route('/author/:id')
        .put(authorController.update);

module.exports = author;