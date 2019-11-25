const database = require('../services/database.js');

async function userLogin(context) {

  const sql = 
  `SELECT USER_ID, USERNAME, PASSWORD
  from DBTOUCAN."USER" 
  where USERNAME= :usn and PASSWORD= :psw`
 

  const binds = {usn: context.username, psw: context.passw}
 

    const result = await database.simpleExecute(sql, binds);
    id = result.rows[0].USER_ID;
 
    if (result.rows[0] === undefined){
      login = false;
    }else{
      login = true;
    }

    return ({login, id});
  }
  module.exports.userLogin = userLogin;