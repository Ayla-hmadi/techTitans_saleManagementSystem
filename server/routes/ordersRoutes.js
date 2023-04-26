const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersControllers');

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getOne);
router.post('/', ordersController.create);
router.put('/:id', ordersController.update);
router.delete('/:id', ordersController.delete);

module.exports = router;