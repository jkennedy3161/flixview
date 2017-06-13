var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var port = process.env.PORT || 8000;

var db = process.env.MONGOLAB_URI || 'mongodb://localhost:' + port + '/flixview';

app.use(express.static('client'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(db);

require('./config/routes')(app, express);

app.listen(port);

console.log('server running on http://localhost:' + port);