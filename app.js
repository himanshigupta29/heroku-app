var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/picture-gallery');

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});
mongoose.connection.on('error', () => {
  console.log("error in connection wth mongo", error);
});

var app = express();
var port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res) => {
  res.send('initial content');
});

app.listen(port, () => {
  console.log('listening at port', port);
});
