const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");

router
  .route("/")
  .get(getEmployees)
  .post(addEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
