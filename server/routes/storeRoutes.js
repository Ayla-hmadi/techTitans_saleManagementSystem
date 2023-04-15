const express = require("express");
const router = express.Router();

const {
  getStores,
  getStore,
  addStore,
  updateStore,
  deleteStore,
} = require("../controllers/storeControllers");

router
  .route("/")
  .get(getStores)
  .post(addStore);

router
  .route("/:id")
  .get(getStore)
  .put(updateStore)
  .delete(deleteStore);

module.exports = router;
