const checklistController = {};
const Item = require('./../models/item-model.js');

checklistController.getChecklists = (req, res) => {
  Item.find({category: 'Sleeping'}, (err, sleepingItems) => {
    if (err) console.log(err);
    Item.find({category: 'Cooking'}, (err, cookingItems) => {
      if (err) console.log(err);
      Item.find({category: 'Shelter'}, (err, shelterItems) => {
        if (err) console.log(err);
        Item.find({category: 'Miscellaneous'}, (err, miscellaneousItems) => {
          if (err) console.log(err);
          Item.find({category: 'Clothing'}, (err, clothingItems) => {
            if (err) console.log(err);
              res.json({
                        sleepingItems: sleepingItems,
                        cookingItems: cookingItems,
                        shelterItems: shelterItems,
                        clothingItems: clothingItems,
                        miscellaneousItems: miscellaneousItems
                       }
              );
          });
        });
      });
    });
  });
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.item) {
    res.send();
  } else {
    Item.create(req.body, (err, item) => {
      if (err) console.log(err)
      res.send('saved to database')
    });
  }
}

checklistController.deleteItem = (req, res) => {
  Item.remove(req.query, (err) => {
    if (err) console.log(err);
    res.send('removed from database')
  });
}

module.exports = checklistController;
