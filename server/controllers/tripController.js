const mongoose = require('mongoose');
const Trip = require('./../models/trip-model');

/**
* @module checklistController
* @description Contains all business logic dealing with database
* operations on trips.
*/

const tripController = {};

/**
* @function getTrips
* @description Queries the database for trips the signed in
* user is a participant in.
*
* Uses Mongoose's populate() method to populate the users field
* (which is an array of ObjectId references to Users).
*
*/

tripController.getTrips = (req, res) => {
  const { userId } = req.params;
  Trip.find({ users: { $in: [userId] } })
    .populate('users', 'username')
    .exec((err, trips) => {
      if (err) res.status(500).send(err);
      res.send(trips);
    });
};

/**
* @function addTrip
* @description Saves a new trip in the database.
*
* Pushes the signed in user's id into the saved trip's users array
* so that the trip can be referenced by a given user.
*
*/

tripController.addTrip = (req, res) => {
  const { tripName } = req.body;
  const { userId } = req.body;
  const trip = new Trip({ tripName });
  trip.users.push(mongoose.Types.ObjectId(userId));
  trip.save((err) => {
    if (err) res.status(500).send(err);
    Trip.populate(trip, { path: 'users', select: 'username' }, (err, trip) => {
      res.send(trip);
    });
  });
};

tripController.removeTrip = (req, res) => {
  console.log('works');
}

tripController.updateTrip = (req, res) => {
  console.log('works');
}

tripController.addParticipant = (req, res) => {
  console.log('works');
  const { tripId, userId } = req.body;
  Trip.findById(tripId, (err, trip) => {
    if (err) res.status(500).send(err);
    trip.users.push(mongoose.Types.ObjectId(userId));
    trip.save((err) => {
      if (err) res.status(500).send(err);
      res.send(trip);
    })
  });
}
module.exports = tripController;
