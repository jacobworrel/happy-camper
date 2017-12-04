const express = require('express');
const tripController = require('./../controllers/tripController');

const router = express.Router();

router.get('/:userId', tripController.getTrips);
router.post('/participants', tripController.addParticipant);
router.post('/', tripController.addTrip);
router.delete('/', tripController.removeTrip);
router.patch('/', tripController.updateTrip);

module.exports = router;
