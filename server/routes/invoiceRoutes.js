const express = require("express");
const router = express.Router();

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceControllers");

router
  .route("/")
  .get(getInvoices)
  .post(addInvoice);

router
  .route("/:id")
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

module.exports = router;
