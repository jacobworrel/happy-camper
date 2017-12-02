const mongoose = require('mongoose');
const Item = require('./../models/item-model');
const Trip = require('./../models/trip-model');
const User = require('./../models/user-model');

const checklistController = {};

// checklistController.findItems = (query) => {
//   return new Promise((resolve, reject) => {
//     Item.find(query)
//     // populate the owner field with the username property from the user object it is referencing
//     .populate('owner', 'username')
//     .exec((err, items) => {
//       if (err) reject(err);
//       resolve(items);
//     });
//   });
// }

checklistController.findOwner = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      resolve(user.username);
    });
  });
};

checklistController.findItems = (tripId, category) => {
  return new Promise((resolve, reject) => {
    Trip.findById(tripId)
      .populate({
        path: 'checklist',
        match: { category },
      })
      .exec((err, trip) => {
        if (err) reject(err);
        const promises = trip.checklist.map(item => checklistController.findOwner(item.owner));
        Promise.all(promises)
          .then((owners) => {
            const checklist = trip.checklist.map((item, i) => ({ ...item._doc, owner: owners[i] }));
            resolve(checklist);
          });
      });
  });
};

checklistController.getChecklists = (req, res) => {
  const { tripId } = req.params;
  const categories = ['Sleeping', 'Cooking', 'Shelter', 'Miscellaneous', 'Clothing', 'Food'];
  const promises = categories.map(category => checklistController.findItems(tripId, category));
  Promise.all(promises)
    .then((checklists) => {
      const payload = {};
      checklists.forEach((checklist, i) => {
        payload[categories[i]] = checklist.reduce((a, c) => {
          return [...a, { name: c.name, checked: c.checked, id: c._id, owner: c.owner }];
        }, []);
      });
      res.json(payload);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

checklistController.addItem = (req, res) => {
  const { tripId, category, name, userId } = req.body;
  if (!req.body.category || !req.body.name) {
    res.send('please enter an item');
  } else {
    const item = new Item({ category, name, owner: mongoose.Types.ObjectId(userId) });
    item.save((err) => {
      if (err) res.status(500).send(err);
      res.send({ id: item._id });
    });
    Trip.findById(tripId, (err, trip) => {
      trip.checklist.push(item);
      trip.save(err => console.log('saved item in trip!'))
    });
  }
};

// when deleting an item, item must be removed from item collection
// but also from trip.checklist to maintain referential integrity
checklistController.deleteItem = (req, res) => {
  const { _id, selectedTrip } = req.body;
  Item.remove({ _id }, (err) => {
    if (err) res.status(500).send(err);
    res.send('removed from database')
  });
  Trip.findById(selectedTrip, (err, trip) => {
    trip.checklist.pull({ _id });
    trip.save(err => console.log('removed item from trip model'));
  });
};

checklistController.updateItem = (req, res) => {
  Item.findOneAndUpdate(req.query, req.body, (err, updatedItem) => {
    if (err) res.status(500).send(err);
    res.send('item updated');
  });
};

module.exports = checklistController;
