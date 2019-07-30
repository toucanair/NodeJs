const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMessage = require("./configMessage");
const http = require('http');
const host = '18.217.17.68';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Primer servidor con Node.Js');
  });

const app = express(); /*instancia express*/
app.use(cors()); /*Middlewares*/
app.use(bodyParser.json());

server.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});

server.post("/formulario", (req, res) => { /*ENDPOINT*/
    console.log(req.body);
    configMessage(req.body);
    res.status(200).send();
});

/*
app.post("/formulario", (req, res) => { /*ENDPOINT
    console.log(req.body);
    configMessage(req.body);
    res.status(200).send();
});


app.listen(3000, () => { /*Escucha de nuestro server
    console.log("Server started on port 3000!");
});*/