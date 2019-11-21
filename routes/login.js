var express = require ('express');
var router = new express.Router();
var loginController = require('../controllers/login.js');


router.route('/login')
    .post(loginController.post);

module.exports = router;