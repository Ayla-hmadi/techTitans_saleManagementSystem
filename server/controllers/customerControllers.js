// const pool = require("../config/db");

// const getCustomers = async (req, res) => {
//   try {
//     const allCustomers = await pool.query("SELECT * FROM customer");
//     res.json(allCustomers.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const getCustomerById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const customer = await pool.query("SELECT * FROM customer WHERE id = $1", [
//       id,
//     ]);
//     res.json(customer.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const createCustomer = async (req, res) => {
//   try {
//     const { id, name, phone_number } = req.body;
//     const newCustomer = await pool.query(
//       "INSERT INTO customer (id, name, phone_number) VALUES ($1, $2, $3) RETURNING *",
//       [id, name, phone_number]
//     );
//     res.json(newCustomer.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const updateCustomer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, phone_number } = req.body;
//     const updatedCustomer = await pool.query(
//       "UPDATE customer SET name = $1, phone_number = $2 WHERE id = $3 RETURNING *",
//       [name, phone_number, id]
//     );
//     res.json(updatedCustomer.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const deleteCustomer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM customer WHERE id = $1", [id]);
//     res.json(`Customer with id ${id} was deleted!`);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// module.exports = {
//   getCustomers,
//   getCustomerById,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
// };


const mysql = require('mysql');
const db = require('../config/db');
// Get all branches
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one branch by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customer WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new branch
exports.create = (req, res) => {
  const { id, name, phone_number } = req.body;
  const sql = `INSERT INTO branch ( id, name, phone_number) VALUES ('${id}', '${name}', '${phone_number}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch created successfully');
  });
};

// Update a branch by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, phone_number} = req.body;
  const sql = `UPDATE branch SET  name = '${name}', quatity = '${phone_number}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('buys updated successfully');
  });
};

// Delete a branch by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM buys WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch deleted successfully');
  });
};
