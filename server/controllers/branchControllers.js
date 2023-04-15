// // controllers/entityController.js

// const {pool} = require("../config/db");

// const getAllBranches = async (req, res) => {
//   try {
//     const rows = await new Promise((resolve, reject) => {
//       pool.query("SELECT * FROM branch", (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error getting branches" });
//   }
// };

// // GET a single entity by ID
// const getBranchyById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { rows } = await pool.query("SELECT * FROM Branch WHERE id = $1", [
//       id,
//     ]);
//     if (rows.length === 0) {
//       res.status(404).json({ message: `Branch with ID ${id} not found` });
//     } else {
//       res.status(200).json(rows[0]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: `Error getting Branch with ID ${id}` });
//   }
// };

// // POST a new entity
// const createBranch = async (req, res) => {
//   const { name } = req.body;
//   try {
//     const { rows } = await pool.query(
//       "INSERT INTO Branch (name) VALUES ($1) RETURNING *",
//       [name]
//     );
//     res.status(201).json(rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating Branch" });
//   }
// };

// module.exports = {
//   getAllBranches,
//   getBranchyById,
//   createBranch,
// };

const mysql = require('mysql');
const db = require('../config/db');

// Get all branches
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM branch';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one branch by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM branch WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new branch
exports.create = (req, res) => {
  const { id, phone_number, location, store_id } = req.body;
  const sql = `INSERT INTO branch (id, phone_number, location, store_id) VALUES ('${id}', '${phone_number}', '${location}', '${store_id}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch created successfully');
  });
};

// Update a branch by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { phone_number, location, store_id } = req.body;
  const sql = `UPDATE branch SET phone_number = '${phone_number}', location = '${location}', store_id = '${store_id}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch updated successfully');
  });
};

// Delete a branch by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM branch WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch deleted successfully');
  });
};
