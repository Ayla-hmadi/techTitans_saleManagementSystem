const express = require("express");
const router = express.Router();

const {
  getVendors,
  getVendor,
  addVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorControllers");

router
  .route("/")
  .get(getVendors)
  .post(addVendor);

router
  .route("/:id")
  .get(getVendor)
  .put(updateVendor)
  .delete(deleteVendor);

module.exports = router;
