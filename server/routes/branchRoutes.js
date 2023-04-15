// // routes/entityRoutes.js

// const express = require("express");
// const router = express.Router();
// const { getAllBranches, getBranchyById, createBranch } =
//   require("../controllers/branchControllers");

// // GET all entities
// router.get("/", getAllBranches);

// // GET a single entity by ID
// router.get("/:id", getBranchyById);

// // POST a new entity
// router.post("/", createBranch);

// module.exports = router;

const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchControllers');

router.get('/', branchController.getAll);
router.get('/:id', branchController.getOne);
router.post('/', branchController.create);
router.put('/:id', branchController.update);
router.delete('/:id', branchController.delete);

module.exports = router;