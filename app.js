const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMessage = require("./configMessage");
const oracledb = require("oracledb");
const morgan = require("morgan");
const dbconfig = require('./data/connect.js');

const app = express(); 


/*MIDDLEWARES*/
app.use(cors()); 
app.use(bodyParser.json());
app.use(morgan('combined'));

/* FILE ROUTES CHARGE */ 

var user_routes = require ('./routes/user');


/*ROUTES*/

app.get("/", (req,res) => {
  res.status(200).send(
      "Api Toucan Air"
  );
});

app.use("/", user_routes);

/*ENDPOINT TO SEND EMAILS*/
app.post("/formulario", (req, res) => { 
    console.log(req.body);
    configMessage(req.body);
    res.status(200).send();
});



app.listen(3000, () => { /* server start*/
    console.log("Server started on port 3000!");
});

/*EXPORTS*/

module.exports = app;