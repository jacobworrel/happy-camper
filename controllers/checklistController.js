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
        console.log(c.name)
        console.log(c.checked)
        // return a.concat(c.item);
        return [...a, { name: c.name, checked: c.checked }];
      }, []);
    })
    res.json(payload);
  }).catch((err) => {
    console.log(err);
  })
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.name) {
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

checklistController.updateItem = (req, res) => {
  // Item.findOneAndUpdate({ item: req.params.item }, req.body, (err, updatedItem) => {
  //   if (err) res.status(418).send(err);
  //   res.json(updatedItem);
  // });
}

module.exports = checklistController;
