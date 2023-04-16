const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeControllers');

router.get('/', storeController.getAll);
router.get('/:id', storeController.getOne);
router.post('/', storeController.create);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);

module.exports = router;