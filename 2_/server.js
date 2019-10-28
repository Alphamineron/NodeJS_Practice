console.log("Server is Starting");

const SAdata = require('./SAdata');

const express = require('express');

const PORT = 3000;
const app = express();

const server = app.listen(PORT, listening);

function listening() {
    console.log(`Server is listening on port: ${PORT}`);
}



app.use(express.static('FrontEnd'));
app.get("/hello", api_getHello);     // Creating REST API Endpoints
app.get("/say/:var/:num", api_getSay);
app.get("/all", api_getAll);


// Handling a route
function api_getHello(req, res) {
    res.send("Hello World!");
}

function api_getSay(req, res) {
    let data = req.params;
    let reply = "";

    for (var i = 0; i < data.num; i++)
        reply += data.var + "<br>";

    res.send(reply);
}

function api_getAll(req, res) {
    res.send(SAdata.words);
}
