/*const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMessage = require("./configMessage");
const oracledb = require("oracledb");
const morgan = require("morgan");
const dbconfig = require('./data/connect.js');

const app = express(); 

app.use(cors()); 
app.use(bodyParser.json());
app.use(morgan('combined'));


var user_routes = require ('./routes/user');





app.post("/formulario", (req, res) => { 
    console.log(req.body);
    configMessage(req.body);
    res.status(200).send();
});



app.listen(3000, () => { 
    console.log("Server started on port 3000!");
});



module.exports = app;*/