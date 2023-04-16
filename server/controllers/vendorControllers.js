
const mysql = require('mysql');
const db = require('../config/db');

// Get all vendors
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM vendor';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one vendor by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM vendor WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new vendor
exports.create = (req, res) => {
  const { id, name, phone_number } = req.body;
  const sql = `INSERT INTO vendor (id, name, phone_number) VALUES ('${id}', '${name}', '${phone_number}', )`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Vendor created successfully');
  });
};

// Update a vendor by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, phone_number } = req.body;
  const sql = `UPDATE vendor SET phone_number = '${name}', '${phone_number}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Vendor updated successfully');
  });
};

// Delete a vendor by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM vendor WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Vendor deleted successfully');
  });
};
