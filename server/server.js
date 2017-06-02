var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var port = process.env.PORT || 8000;

app.use(express.static('client'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/flixview');

require('./config/routes')(app, express);

app.listen(port);

console.log('server running on http://localhost: ' + port);