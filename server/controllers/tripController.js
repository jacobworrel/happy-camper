const mongoose = require('mongoose');
const Trip = require('./../models/trip-model');

const tripController = {};


tripController.getTrips = (req, res) => {
  const { userId } = req.params;
  Trip.find({})
    .populate({
      path: 'users',
      match: { _id: userId },
    })
    .exec((err, trips) => {
      if (err) res.status(500).send(err);
      res.send(trips);
    });
};

tripController.addTrip = (req, res) => {
  const { tripName } = req.body;
  const { userId } = req.body;
  const trip = new Trip({ tripName });
  trip.users.push(mongoose.Types.ObjectId(userId));
  trip.save((err) => {
    if (err) res.status(500).send(err);
    res.send(trip);
  });
};

tripController.removeTrip = (req, res) => {
  console.log('works');
}

tripController.updateTrip = (req, res) => {
  console.log('works');
}

module.exports = tripController;
