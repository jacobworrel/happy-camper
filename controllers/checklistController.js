const checklistController = {};
const Item = require('./../models/item-model.js');

checklistController.findItems = (obj) => {
  return new Promise((resolve, reject) => {
    Item.find(obj, (err, items) => {
      resolve(items);
      reject(err);
    });
  });
}

checklistController.getChecklists = (req, res) => {
  Promise.all([
    checklistController.findItems({ category: 'Sleeping' }),
    checklistController.findItems({ category: 'Cooking' }),
    checklistController.findItems({ category: 'Shelter' }),
    checklistController.findItems({ category: 'Miscellaneous' }),
    checklistController.findItems({ category: 'Clothing' }),
    checklistController.findItems({ category: 'Food' }),
  ]).then((checklists) => {
    const payload = {};
    checklists.forEach((checklist, i) => {
      payload[i] = checklist;
    })
    res.json(payload);
  }).catch((err) => {
    console.log(err);
  })
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.item) {
    res.send('please enter valid username and password');
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
