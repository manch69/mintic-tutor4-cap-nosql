const express = require('express');

let libroController = require('../controllers/LibroController')

let libro = express.Router();

    libro.route('/libro')
        .get(libroController.readAll);

    libro.route('/libro/:id') // libro/1235?idautor=456
        .get(libroController.readById);

    libro.route('/libro')
        .post(libroController.create);
    
    libro.route('/libro/:id')
        .delete(libroController.deleteOne);
    
    libro.route('/libro')
        .delete(libroController.deleteAll);

    libro.route('/libro/:id')
        .put(libroController.update);

module.exports = libro;