const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
let firstFile = fs.readFileSync('./users.json', 'utf-8');
let users = JSON.parse(firstFile);


app.get('/users', (req, res) => res.json(users)
);














app.listen(3000, () => console.log("done"));