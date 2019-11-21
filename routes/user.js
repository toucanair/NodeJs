var express = require ('express');
var router = new express.Router();
var userController = require('../controllers/user.js');


router.route('/users/:id?')
    .get(userController.get)
    .post(userController.post)
    .put(userController.put)
    .delete(userController.delete);

module.exports = router;