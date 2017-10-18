import express from 'express';
import tripController from './../controllers/tripController';

let router = express.Router();

router.get('/:userId', tripController.getTrips);
router.post('/', tripController.addTrip);
router.delete('/', tripController.removeTrip);
router.patch('/', tripController.updateTrip);

export default router;
