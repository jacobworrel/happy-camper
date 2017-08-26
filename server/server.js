import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';
import items from './routes/items';
import users from './routes/users';

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

//catch all to serve index.html file at every route
app.get('/*', (req, res) => {
  console.log('serving index html')
  res.sendFile(path.join(__dirname,'./../client/public/index.html'))
});

app.listen(3000);
