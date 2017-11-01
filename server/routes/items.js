const express = require('express');
const checklistController = require('./../controllers/checklistController');

let router = express.Router();

router.get('/', checklistController.getChecklists);
router.post('/', checklistController.addItem);
router.delete('/', checklistController.deleteItem);
router.patch('/', checklistController.updateItem);

module.exports = router;
