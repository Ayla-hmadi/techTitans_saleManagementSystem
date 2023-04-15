const express = require("express");
const router = express.Router();

const {
  getOwnership,
  getOwnershipsByBranch,
  getOwnershipsByStore,
  addOwnership,
  updateOwnership,
  deleteOwnership,
} = require("../controllers/ownsControllers");

router
  .route("/")
  .get(getOwnership)
  .post(addOwnership);

router
  .route("/:id")
  .get(getOwnership)
  .put(updateOwnership)
  .delete(deleteOwnership);

router.route("/byBranch/:id").get(getOwnershipsByBranch);
router.route("/byStore/:id").get(getOwnershipsByStore);

module.exports = router;
