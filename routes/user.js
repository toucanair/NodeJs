var express = require ('express');
var router = new express.Router();
var userController = require('../controllers/user.js');

/*
router.get('/home', userController.home);

router.post('/test', userController.test);

router.get('/users', userController.users);

router.post('/signUp', userController.newUser);*/

/*router.get('/users/:username?', userController.getUsername);*/

router.route('/users/:id?')
    .get(userController.get)
    .post(userController.post)
    .put(userController.put)
    .delete(userController.delete);

module.exports = router;