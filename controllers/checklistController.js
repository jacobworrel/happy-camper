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
    const categories = ['Sleeping', 'Cooking', 'Shelter', 'Miscellaneous', 'Clothing', 'Food'];
    checklists.forEach((checklist, i) => {
      payload[categories[i]] = checklist.reduce((a, c) => {
        return [...a, { name: c.name, checked: c.checked, id: c._id }];
      }, []);
    })
    res.json(payload);
  }).catch((err) => {
    console.log(err);
  })
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.name) {
    res.send('please enter an item');
  } else {
    Item.create(req.body, (err, item) => {
      if (err) console.log(err)
      res.send({ id: item._id })
    });
  }
}

checklistController.deleteItem = (req, res) => {
  Item.remove(req.query, (err) => {
    if (err) console.log(err);
    res.send('removed from database')
  });
}

checklistController.updateItem = (req, res) => {
  console.log(req.query)
  Item.findOneAndUpdate({ item: req.query._id }, req.body, (err, updatedItem) => {
    if (err) res.status(418).send(err);
    res.json(updatedItem);
  });
}

module.exports = checklistController;
