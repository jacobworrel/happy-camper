const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const checklistController = require('./controllers/checklistController');

const mongoose = require('mongoose');
mongoose.connect('mongodb://jacobworrel:mlabpass1@ds143071.mlab.com:43071/camping-gear');
const Item = require('./models/item-model.js');

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/items', checklistController.getChecklists);
app.post('/items', checklistController.addItem);
app.delete('/items', checklistController.deleteItem);

app.listen(3000);
