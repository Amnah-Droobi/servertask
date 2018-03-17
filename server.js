const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
let firstFile = fs.readFileSync('./users.json', 'utf-8');
let users = JSON.parse(firstFile);
let secondFile = fs.readFileSync('./drug.json', 'utf-8');
let drugs = JSON.parse(secondFile);

app.get('/users', (req, res) => res.json(users)
);

app.get('/drugs', (req, res) => res.json(drugs)
);













app.listen(3000, () => console.log("done"));