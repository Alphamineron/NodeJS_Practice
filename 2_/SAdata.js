const fs = require('fs');
const FILENAME = "SAdata.json";

let words = JSON.parse(fs.readFileSync(FILENAME));
console.log(words);




exports.words = words;

exports.save = function (words) {
    let data = JSON.stringify(words, null, 4);
    fs.writeFile(FILENAME, data, function (err) {
        console.log("JSON Saved!");
    });
}
