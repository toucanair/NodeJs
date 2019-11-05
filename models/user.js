const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery =
`SELECT USER_ID "user_id",
FIRST_NM "first_name",
LAST_NM "last_name",
PHN_NUM "phone_number",
EMAIL "email",
USERNAME "username",
PASSWORD "passw"
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

const createSql =
 `insert into DBTOUCAN."USER" (
    USER_ID,
    FIRST_NM,
    LAST_NM,
    PHN_NUM,
    EMAIL,
    USERNAME,
    PASSWORD
  ) values (
    :user_id,
    :first_name,
    :last_name,
    :phone_number,
    :email,
    :username,
    :passw
  )`;
 
async function create(emp) {
  const user = Object.assign({}, emp);
/*
  user.id_user = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }*/
  console.log(user);

  const result = await database.simpleExecute(createSql, user);
 
 /*user.user_id = result.outBinds.user_id[0];*/
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
      PASSWORD = :passw
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
