const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeControllers');

router.get('/', employeeController.getAll);
router.get('/:id', employeeController.getOne);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router;