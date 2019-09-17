const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMessage = require("./configMessage");


const app = express(); /*instancia express*/
app.use(cors()); /*Middlewares*/
app.use(bodyParser.json());


app.post("/formulario", (req, res) => { /*ENDPOINT*/
    console.log(req.body);
    configMessage(req.body);
    res.status(200).send();
});


app.listen(3000, () => { /*Escucha de nuestro server*/
    console.log("Server started on port 3000!");
});