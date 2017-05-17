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
            res.json({
                      sleepingItems: sleepingItems,
                      cookingItems: cookingItems,
                      shelterItems: shelterItems,
                      miscellaneousItems: miscellaneousItems
                     }
            );
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
      console.log('saved to database');
      res.redirect('/')
    });
  }
}

checklistController.deleteItem = (req, res) => {
  console.log('in delete method');
  Item.remove(req.query, (err) => {
    if (err) console.log(err);
    console.log('removed!')
    res.redirect(200, '/')
  });
}

module.exports = checklistController;
