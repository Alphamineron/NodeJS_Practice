console.log("Server is Starting");

const SAdata = require('./SAdata');     // SyncLoading Data before the Server boots up



const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

const server = app.listen(PORT, listening);
function listening() {
    console.log(`Server is listening on port: ${PORT}`);
}


app.use(express.static('FrontEnd'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.post("/analyze", analyzeText);

function analyzeText(request, response) {
    // console.log(request.body);   // See the terminal and you'd realize how much extra information
                                // we get in a POST request, So this is gonna be a bit challenging
    let text = request.body.text;
    let tokens = text.split(/\W+/);
    let totalScore = 0;
    let Weighted_Tokens = [];
    for (var i = 0; i < tokens.length; i++) {
        let score = 0;
        let found = false;
        if (SAdata.words.hasOwnProperty(tokens[i])) {
            score = Number(SAdata.words[tokens[i]]);
            found = true;
        }


        if(found) {
            Weighted_Tokens.push({
                word: tokens[i],
                score: score
            });
        }
        totalScore += score;
    }

    let comp = totalScore/tokens.length;

    let reply = {
        msg: "Analyte Text Processed",
        score: totalScore,
        comparative: comp,
        words: Weighted_Tokens
    };

    response.send(reply);
}


app.get("/hello", api_getHello);     // Creating REST API Endpoints
app.get("/say/:var/:num", api_getSay);
app.get("/add/:word/:score?", api_addWord);
app.get("/search/:word", api_searchWord);
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

function api_addWord(req, res) {
    let data = req.params;
    let reply;

    if(!data.score)
        reply = {
            msg: "Score is required!"
        };
    else {
        SAdata.words[data.word] = Number(data.score);
        reply = {
            msg: "Word [" + data.word + "] has been added."
        };
        SAdata.save(SAdata.words);
    }

    res.send(reply);
}

function api_searchWord(req, res) {
    let word = req.params.word;
    let reply;

    if(SAdata.words[word]) {
        reply = {
            status: "Found",
            word: word,
            score: SAdata.words[word]
        };
    }
    else {
        reply = {
            status: "Not Found",
            word: word
        };
    }

    res.send(reply);
}
