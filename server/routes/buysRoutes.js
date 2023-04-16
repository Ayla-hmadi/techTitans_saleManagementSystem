const express = require('express');
const router = express.Router();
const buysController = require('../controllers/buysControllers');

router.get('/', buysController.getAll);
router.get('/:id', buysController.getOne);
router.post('/', buysController.create);
router.put('/:id', buysController.update);
router.delete('/:id', buysController.delete);

module.exports = router;