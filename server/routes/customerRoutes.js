const express = require("express");
const router = express.Router();

const {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerControllers");

router
  .route("/")
  .get(getCustomers)
  .post(addCustomer);

router
  .route("/:id")
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
