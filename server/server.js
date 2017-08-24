import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import authController from './../controllers/authController';
import checklistController from './../controllers/checklistController';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

mongoose.connect('mongodb://jacobworrel:mlabpass1@ds143071.mlab.com:43071/camping-gear');
mongoose.connection.once('open', () => console.log('Connected to Database'));

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/public')));

//catch all to serve index.html file at every route
app.get('/*', (req, res) => res.sendFile(path.join(__dirname,'./../client/public/index.html')));

//item routes:
app.get('/items', checklistController.getChecklists);
app.post('/items', checklistController.addItem);
app.delete('/items', checklistController.deleteItem);
app.patch('/items', checklistController.updateItem);

//auth routes:
app.post('/login', authController.verifyUser);
app.post('/signup', authController.addUser);

app.listen(3000);
