const express = require("express");
const router = express.Router();

const {
  getBuys,
  getBuy,
  addBuy,
  updateBuy,
  deleteBuy,
} = require("../controllers/buysControllers");

router
  .route("/")
  .get(getBuys)
  .post(addBuy);

router
  .route("/:id")
  .get(getBuy)
  .put(updateBuy)
  .delete(deleteBuy);

module.exports = router;
