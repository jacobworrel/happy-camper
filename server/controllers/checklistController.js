const mongoose = require('mongoose');
const Item = require('./../models/item-model');
const Trip = require('./../models/trip-model');

/**
* @module checklistController
* @description Contains all business logic dealing with database
* operations on checklist items.
*/

const checklistController = {};

/**
* @function findItems
* @param {string} tripId - The trip id.
* @param {string} category - The checklist category.
* @returns {Promise}
* @description Queries the database for a trip and
* and returns a promise of all checklist items matching the given category.
*
* Uses Mongoose's populate() method to populate the checklist field
* (which is an array of ObjectId references to Items) as well as
* each item's nested owner field (which is an ObjectId reference to User).
*
*/

checklistController.findItems = (tripId, category) => {
  return new Promise((resolve, reject) => {
    Trip.findById(tripId)
      .populate({
        path: 'checklist',
        match: { category },
        populate: {
          path: 'owner',
          model: 'User',
          select: 'username',
        },
      })
      .exec((err, trip) => {
        if (err) reject(err);
        resolve(trip.checklist);
      });
  });
};

/**
* @function getChecklists
* @description Queries the database via the findItems() helper
* and transforms the data into an object with checklist categories as keys
* and arrays of items as their values.
*
*/

checklistController.getChecklists = (req, res) => {
  const { tripId } = req.params;
  const categories = ['Sleeping', 'Cooking', 'Shelter', 'Miscellaneous', 'Clothing', 'Food'];
  const promises = categories.map(category => checklistController.findItems(tripId, category));
  Promise.all(promises)
    .then((checklists) => {
      const payload = {};
      checklists.forEach((checklist, i) => {
        payload[categories[i]] = checklist.reduce((a, c) => {
          return [
            ...a,
            {
              name: c.name,
              checked: c.checked,
              id: c._id,
              owner: c.owner.username,
            },
          ];
        }, []);
      });
      res.json(payload);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

/**
* @function addItem
* @description Adds a newly created item to the database.
*
* Stores a reference to the signed in user under the item's owner property.
* Pushes a reference to the newly created item into the trip's checklist array.
*
*/

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

/**
* @function deleteItem
* @description Deletes an item from the database.
*
* Item is deleted from the items collection as well as the selected trip's
* checklist array to preserve referential integrity.
*
*/

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

/**
* @function updateItem
* @description Updates an item in the database.
*
*/

checklistController.updateItem = (req, res) => {
  Item.findOneAndUpdate(req.query, req.body, (err, updatedItem) => {
    if (err) res.status(500).send(err);
    res.send('item updated');
  });
};

module.exports = checklistController;
