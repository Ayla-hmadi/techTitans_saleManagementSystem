const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerControllers');

router.get('/', customerController.getAll);
router.get('/:id', customerController.getOne);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;