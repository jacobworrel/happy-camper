import mongoose from 'mongoose';
import User from './../models/user-model.js';
import { Trip } from './../models/trip-model';
const tripController = {};


tripController.getTrips = (req, res) => {
  const userId = req.params.userId;
  Trip.find({})
      .populate({
        path: 'users',
        match: { _id: userId }
      })
      .exec((err, trips) => {
        if (err) res.status(500).send(err);
        res.send(trips);
      })
}

tripController.addTrip = (req, res) => {
  const { tripName } = req.body;
  const { userId } = req.body;
  const trip = new Trip({ tripName });
  trip.users.push(mongoose.Types.ObjectId(userId));
  trip.save((err) => {
    if (err) res.status(500).send(err);
    res.send('trip saved to db!');
  })
}

tripController.removeTrip = (req, res) => {
  console.log('works');
}

tripController.updateTrip = (req, res) => {
  console.log('works');
}

export default tripController;
