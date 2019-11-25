const login = require('../models/login.js');
const jwt = require('jsonwebtoken');

const JWT_Secret = 'toucanair2019.';


function getLoginUser(req) { // inicializa un usuario
    const login = {
        id: req.body.id,
        username: req.body.username,
        passw: req.body.passw
      };
    return login;
  }
   
  async function post(req, res, next) { //
    try {
    
      let Loginuser = getLoginUser(req);
      const resultLogin = await login.userLogin(Loginuser);
      
      if (resultLogin.login){
        var token = jwt.sign(resultLogin, JWT_Secret);
        console.log("Logged in User");
        res.status(200).send({
          signed_user: true,
          token: token,
          CurrentId: resultLogin.id});
      }else{
        console.log("User don't exist")
        res.status(200).send(false);
      }

    } catch (err) {
      next(err);

    }
  }
   
  module.exports.post = post;