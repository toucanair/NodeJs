const database = require('../services/database.js');

async function userLogin(context) {

  const sql = 
  `SELECT USERNAME, PASSWORD
  from DBTOUCAN."USER" 
  where USERNAME= :usn and PASSWORD= :psw`
 

  const binds = {usn: context.username, psw: context.passw}
 

    const result = await database.simpleExecute(sql, binds);

 
    if (result.rows[0] === undefined){
      login = false;
    }else{
      login = true;
    }

    return login;
  }
  module.exports.userLogin = userLogin;