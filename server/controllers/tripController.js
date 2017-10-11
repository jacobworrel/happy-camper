const tripController = {};
import User from './../models/user-model.js';
import { Trip } from './../models/trip-model';

// User.findOne({ username: 'jacob' }, (err, user) => {
//   if (err) console.log(err);
//   user.trips.push({name: 'Joshua Tree'});
//   user.save((err) => {
//     if (err) console.log(err);
//     console.log('trip saved in db!')
//   });
// });

tripController.getTrips = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) res.status(500).send(err);
    res.json(user.trips);
  });
}

tripController.addTrip = (req, res) => {

}

tripController.removeTrip = (req, res) => {
  console.log('works');
}

tripController.updateTrip = (req, res) => {
  console.log('works');
}

export default tripController;
