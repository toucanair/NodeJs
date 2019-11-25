const users = require('../models/user.js');

async function get(req, res, next) {
    try {
      const context = {};
   
      context.id = parseInt(req.params.id, 10);
   
      const rows = await users.find(context); //obtener registros
   
      if (req.params.id) { //req params obtn mker objetos de la solicitud entrante
        if (rows.length === 1) {
          res.status(200).json(rows[0]); //si se encontro empleado
        } else {
          res.status(404).end(); // si no se encontro el empleado
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.get = get; // se exporta para usarse en el enrutador

  function getUserFromRec(req) { // inicializa un usuario
    
    const user = {
      user_id: req.body.user_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      username: req.body.username,
      passw: req.body.passw
    };

    return user;
  }
   
  async function post(req, res, next) { //
    try {
      let user = getUserFromRec(req);
   
      user = await users.create(user);
   
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.post = post;

  async function put(req, res, next) {
    try {
      let user = getUserFromRec(req);

      user.user_id = parseInt(req.params.id, 10);
   
      user = await users.update(user);
     
   
      if (user !== null) {
        console.log("user edited")
        res.status(200).send(true);
      } else {
        console.log("Can't Modify this user")
        res.status(200).send(false);
      }
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.put = put;

  async function del(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
   
      const success = await users.delete(id);
   
      if (success) {
        console.log("User deleted");
        res.status(200).send(true);
      } else {
        console.log("User don't exist")
        res.status(200).send(false);
      }
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.delete = del;

  