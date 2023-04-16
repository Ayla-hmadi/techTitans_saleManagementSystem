// const express = require("express");
// const router = express.Router();

// const {
//   getCustomers,
//   getCustomer,
//   addCustomer,
//   updateCustomer,
//   deleteCustomer,
// } = require("../controllers/customerControllers");

// router
//   .route("/")
//   .get(getCustomers)
//   .post(addCustomer);

// router
//   .route("/:id")
//   .get(getCustomer)
//   .put(updateCustomer)
//   .delete(deleteCustomer);

// module.exports = router;


const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerControllers');

router.get('/', customerController.getAll);
router.get('/:id', customerController.getOne);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;