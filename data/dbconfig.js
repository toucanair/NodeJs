
module.exports = {
  user : process.env.NODE_ORACLEDB_USER || "admin",
  
  password : process.env.NODE_ORACLEDB_PASSWORD || "Toucanair2019",
  
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "mydb.cdnbnushsvmq.us-east-2.rds.amazonaws.com:1521/DBTOUCAN",
  
  externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
 };

 /*
var oracledb = require('oracledb');
oracledb.getConnection(
  {
    user          : "admin",
    password      : "Toucanair2019",
    connectString : "mydb.cdnbnushsvmq.us-east-2.rds.amazonaws.com:1521/DBTOUCAN"
  },
  function(err, connection)
  {
    if (err) { console.error(err); return; }
    connection.execute(
      `SELECT FIRST_NM, LAST_NM FROM DBTOUCAN."USER" WHERE USER_ID=2`,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });
*/