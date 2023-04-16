const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceControllers');

router.get('/', invoiceController.getAll);
router.get('/:id', invoiceController.getOne);
router.post('/', invoiceController.create);
router.put('/:id', invoiceController.update);
router.delete('/:id', invoiceController.delete);

module.exports = router;