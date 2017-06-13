var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var port = process.env.PORT || 8000;

var db = process.env.MONGODB_URI || 'mongodb://localhost:/flixview';

app.use(express.static('client'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err, res) {
  if (err) {
    return 'Could not connect due to ' + err + '';
  }
  return res;
});

require('./config/routes')(app, express);

app.listen(port);

console.log('server running on http://localhost:' + port);