import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import authController from './../controllers/authController';
import checklistController from './../controllers/checklistController';
import mongoose from 'mongoose';

const app = express();
mongoose.connect('mongodb://jacobworrel:mlabpass1@ds143071.mlab.com:43071/camping-gear');
mongoose.connection.once('open', () => console.log('Connected to Database'));

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
