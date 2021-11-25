const express = require('express');

let userController = require('../controllers/UserController')

let user = express.Router();

    user.route('/user/login') // user/1235?idautor=456
            .post(userController.login);

    user.route('/user')
        .get(userController.readAll);

    user.route('/user/:id') // user/1235?idautor=456
        .get(userController.readById);

    user.route('/user')
        .post(userController.create);
    
    user.route('/user/:id')
        .delete(userController.deleteOne);
    
    user.route('/user')
        .delete(userController.deleteAll);

    user.route('/user/:id')
        .put(userController.update);

module.exports = user;