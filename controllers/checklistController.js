const checklistController = {};
const Item = require('./../models/item-model.js');

checklistController.getChecklists = (req, res) => {
  Item.find({category: 'sleeping'}, (err, sleepingItems) => {
    if (err) console.log(err);
    Item.find({category: 'cooking'}, (err, cookingItems) => {
      if (err) console.log(err);
      Item.find({category: 'shelter'}, (err, shelterItems) => {
        if (err) console.log(err);
        res.json({
                  sleepingItems: sleepingItems,
                  cookingItems: cookingItems,
                  shelterItems: shelterItems,
                 }
        );
      });
    });
  });
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.item) {
    res.render('./../views/index.ejs', { error: 'Please enter a valid category and item.' });
  } else {
    Item.create(req.body, (err, item) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    });
  }
}

module.exports = checklistController;
