const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorControllers');

router.get('/', vendorController.getAll);
router.get('/:id', vendorController.getOne);
router.post('/', vendorController.create);
router.put('/:id', vendorController.update);
router.delete('/:id', vendorController.delete);

module.exports = router;