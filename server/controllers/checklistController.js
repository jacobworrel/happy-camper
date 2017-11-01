const checklistController = {};
import mongoose from 'mongoose';
import User from './../models/user-model';
import { Item } from './../models/item-model';

checklistController.findItems = (query) => {
  return new Promise((resolve, reject) => {
    Item.find(query)
    // populate the owner field with the username property from the user object it is referencing
    .populate('owner', 'username')
    .exec((err, items) => {
      if (err) reject(err);
      resolve(items);
    });
  });
}

checklistController.getChecklists = (req, res) => {
  const categories = ['Sleeping', 'Cooking', 'Shelter', 'Miscellaneous', 'Clothing', 'Food'];
  const promises = categories.map((category) => checklistController.findItems({ category }));
  Promise.all(promises)
    .then((checklists) => {
      const payload = {};
      checklists.forEach((checklist, i) => {
        payload[categories[i]] = checklist.reduce((a, c) => {
          return [...a, { name: c.name, checked: c.checked, id: c._id, owner: c.owner.username }];
        }, []);
      })
      res.json(payload);
    }).catch((err) => {
      res.status(500).send(err);
    })
}

checklistController.addItem = (req, res) => {
  const { category, name, userId } = req.body;
  if (!req.body.category || !req.body.name) {
    res.send('please enter an item');
  } else {
    const item = new Item();
    item.category = category;
    item.name = name;
    // add reference to user in owner field using userId obtained from the client
    item.owner = mongoose.Types.ObjectId(userId);
    item.save((err) => {
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
