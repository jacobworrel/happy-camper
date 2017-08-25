import express from 'express';
import checklistController from './../controllers/checklistController';

let router = express.Router();

router.get('/', checklistController.getChecklists);
router.post('/', checklistController.addItem);
router.delete('/', checklistController.deleteItem);
router.patch('/', checklistController.updateItem);

export default router;
