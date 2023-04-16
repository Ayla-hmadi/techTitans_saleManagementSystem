
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
