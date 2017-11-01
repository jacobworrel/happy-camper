const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.dev.js');
const items = require('./routes/items');
const users = require('./routes/users');
const trips = require('./routes/trips');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jacobworrel:mlabpass1@ds143071.mlab.com:43071/camping-gear', {
  useMongoClient: true
}).then(() => console.log('Connected to Database'));

const app = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use('/items', items);
app.use('/users', users);
app.use('/trips', trips);

//catch all to serve index.html file at every route
app.get('/*', (req, res) => {
  console.log('serving index html')
  res.sendFile(path.join(__dirname,'./../client/public/index.html'))
});

app.listen(3000);
