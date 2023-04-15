const express = require("express");
const router = express.Router();

const {
  getProductVendors,
  getProductVendor,
  addProductVendor,
  updateProductVendor,
  deleteProductVendor,
} = require("../controllers/productVendorControllers");

router
  .route("/")
  .get(getProductVendors)
  .post(addProductVendor);

router
  .route("/:id")
  .get(getProductVendor)
  .put(updateProductVendor)
  .delete(deleteProductVendor);

module.exports = router;
