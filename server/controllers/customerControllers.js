

const mysql = require('mysql');
const db = require('../config/db');
// Get all customers
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one customer by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customer WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new customer
exports.create = (req, res) => {
  const { name, phoneNumber } = req.body;
  const sql = `INSERT INTO customer (name, phoneNumber) VALUES ('${name}', '${phoneNumber}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('customer created successfully');
  });
};

// Update a customer by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber} = req.body;
  const sql = `UPDATE customer SET  name = '${name}', quatity = '${phoneNumber}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('customers updated successfully');
  });
};

// Delete a customer by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('customer deleted successfully');
  });
};
