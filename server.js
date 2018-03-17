const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
let firstFile = fs.readFileSync('./users.json', 'utf-8');
let users = JSON.parse(firstFile);