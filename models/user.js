const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery =
`SELECT USER_ID "user_id",
FIRST_NM "first_name",
LAST_NM "last_name",
PHN_NUM "phone_number",
EMAIL "email",
USERNAME "username",
PASSWORD "passw",
USER_ROL_ID "rol"
from DBTOUCAN."USER"`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.USER_ID = context.id;
    query += `\nwhere USER_ID = :user_id`; //variable de enlace
  }
 
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
module.exports.find = find;

const compareUsername = 
`SELECT 
USERNAME "username"
from DBTOUCAN."USER"`;

async function compUsern(username) {

  let query = compareUsername;
  const binds = {};
  
  if (username) {
    binds.USERNAME = username;
    query += `\n where USERNAME = :username`; //variable de enlace
  }
  result = await database.simpleExecute(query, binds);

  if (result.rows[0] === undefined){
     return false;
  }else{
     return true;
  }
 
}
 
module.exports.compUsern = compUsern;

const compareEmail = 
`SELECT 
EMAIL "email"
from DBTOUCAN."USER"`;

async function compEmail(email) {

  let query = compareEmail;
  const binds = {};
  
  if (email) {
    binds.EMAIL = email;
    query += `\n  where EMAIL= :email`; //variable de enlace
  } 
  result = await database.simpleExecute(query, binds);

  
  if (result.rows[0] === undefined){
     return false;
  }else{
     return true;
  }
 
}
 
module.exports.compEmail = compEmail;

const createSql =
 `insert into DBTOUCAN."USER" (
    USER_ID,
    FIRST_NM,
    LAST_NM,
    PHN_NUM,
    EMAIL,
    USERNAME,
    PASSWORD,
    USER_ROL_ID
  ) values (
    :user_id,
    :first_name,
    :last_name,
    :phone_number,
    :email,
    :username,
    :passw,
    :rol
  )`;
 
async function create(emp) {
  const user = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, user);
  
  return user;
}
 
module.exports.create = create;

const updateSql =
 `update DBTOUCAN."USER"
  set FIRST_NM = :first_name,
      LAST_NM = :last_name,
      PHN_NUM = :phone_number,
      EMAIL = :email,
      USERNAME = :username,
      PASSWORD = :passw,
      USER_ROL_ID = :rol
  where USER_ID = :user_id`;
 
async function update(emp) {
  const user = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, user);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
 
module.exports.update = update;

const deleteSql =
 `begin
 
    delete from DBTOUCAN."USER"
    where USER_ID = :user_id;
 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(id) {
  const binds = {
    user_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del;
/* foraneas de por medio
 `begin
 
    delete from job_history
    where employee_id = :employee_id;
 
    delete from employees
    where USER_ID = :user_id;
 
    :rowcount := sql%rowcount;
 
  end;`*/
