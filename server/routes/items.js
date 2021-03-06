const express = require('express');
const checklistController = require('./../controllers/checklistController');

const router = express.Router();

router.get('/:tripId', checklistController.getChecklists);
router.post('/', checklistController.addItem);
router.delete('/', checklistController.deleteItem);
router.patch('/', checklistController.updateItem);

module.exports = router;
