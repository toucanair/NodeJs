const http = require('http');
const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const bodyparser = require("body-parser");
const configMessage = require("../configMessage");
const database = require('./database.js');
const router = require('../routes/user.js');


//const webServerConfig = require('../config/web-server.js');
 
let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    //Middlewares
    app.use(cors()); 
    app.use(morgan('combined'));
    app.use(bodyparser.json());
    app.use('/login',router);

    app.use(express.json({
      reviver: reviveJson
    }));
    
    app.get('/', async (req, res) => {
        /*res.end('Api Toucan Air NEW');*/
      const result = await database.simpleExecute('select user, systimestamp from dual');
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;
 
      res.end(`DB user: ${user}\nDate: ${date}`);
    });

    app.post("/formulario", (req, res) => { 
      console.log(req.body);
      configMessage(req.body);
      res.status(200).send();
    });
 
    httpServer.listen(3000)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${3000}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
        console.log(err);
      });
  });
}
 
module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
   
        resolve();
      });
    });
  }
   
  module.exports.close = close;

  const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
   
  function reviveJson(key, value) {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === 'string' && iso8601RegExp.test(value)) {
      return new Date(value);
    } else {
      return value;
    }
  }