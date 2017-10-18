const checklistController = {};
import { User } from './../models/user-model';
import { Item } from './../models/item-model';

checklistController.findItems = (obj) => {
  return new Promise((resolve, reject) => {
    Item.find(obj, (err, items) => {
      resolve(items);
      reject(err);
    });
  });
}

// checklistController.getChecklists = (req, res) => {
//   //need username to find user
//   User.find()
//   //need trip name to find trip
// }

checklistController.getChecklists = (req, res) => {
  const categories = ['Sleeping', 'Cooking', 'Shelter', 'Miscellaneous', 'Clothing', 'Food'];
  const promises = categories.map((category) => checklistController.findItems({ category }));
  Promise.all(promises)
  .then((checklists) => {
    const payload = {};
    checklists.forEach((checklist, i) => {
      payload[categories[i]] = checklist.reduce((a, c) => {
        return [...a, { name: c.name, checked: c.checked, id: c._id }];
      }, []);
    })
    res.json(payload);
  }).catch((err) => {
    res.status(500).send(err);
  })
}

checklistController.addItem = (req, res) => {
  if (!req.body.category || !req.body.name) {
    res.send('please enter an item');
  } else {
    Item.create(req.body, (err, item) => {
      if (err) res.status(500).send(err);
      res.send({ id: item._id })
    });
  }
}

checklistController.deleteItem = (req, res) => {
  Item.remove(req.query, (err) => {
    if (err) res.status(500).send(err);
    res.send('removed from database')
  });
}

checklistController.updateItem = (req, res) => {
  Item.findOneAndUpdate(req.query, req.body, (err, updatedItem) => {
    if (err) res.status(500).send(err);
    res.send('item updated');
  });
}

export default checklistController;
