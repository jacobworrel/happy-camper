const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const authController = require('./controllers/authController');
const checklistController = require('./controllers/checklistController');
const mongoose = require('mongoose');
const Item = require('./models/item-model.js');

mongoose.connect('mongodb://jacobworrel:mlabpass1@ds143071.mlab.com:43071/camping-gear');
mongoose.connection.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

//item routes:
app.get('/items', checklistController.getChecklists);
app.post('/items', checklistController.addItem);
app.delete('/items', checklistController.deleteItem);
app.patch('/items', checklistController.updateItem);

//auth routes:
app.post('/login', authController.verifyUser);
app.post('/signup', authController.addUser);

app.listen(3000);
