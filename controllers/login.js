const login = require('../models/login.js');


function getLoginUser(req) { // inicializa un usuario
    const login = {
        username: req.body.username,
        passw: req.body.passw
      };
    return login;
  }
   
  async function post(req, res, next) { //
    try {
    
      let Loginuser = getLoginUser(req);
      const resultLogin = await login.userLogin(Loginuser);

      if (resultLogin){
        console.log("Logged in User");
        res.status(200).send(true);
      }else{
        console.log("User don't exist")
        res.status(200).send(false);
      }

    } catch (err) {
      next(err);

    }
  }
   
  module.exports.post = post;