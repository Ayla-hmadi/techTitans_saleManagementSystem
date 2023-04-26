
const mysql = require('mysql');
const db = require('../config/db');

// Get all stores
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM store';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one store by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM store WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new store
exports.create = (req, res) => {
  const { id, name, description } = req.body;
  const sql = `INSERT INTO store (id, name, description) VALUES ('${id}', '${name}', '${description}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Store created successfully');
  });
};

// Update a store by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = `UPDATE store SET name = '${name}', description = ${description}  WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Store updated successfully');
  });
};

// Delete a store by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM store WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Store deleted successfully');
  });
};
