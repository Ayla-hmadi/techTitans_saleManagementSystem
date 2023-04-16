const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchControllers');

router.get('/', branchController.getAll);
router.get('/:id', branchController.getOne);
router.post('/', branchController.create);
router.put('/:id', branchController.update);
router.delete('/:id', branchController.delete);

module.exports = router;