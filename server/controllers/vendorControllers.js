
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
  const { id, name, phoneNumber, city, country } = req.body;
  const sql = `INSERT INTO vendor (id, name, phoneNumber, city, country) VALUES ('${id}', '${name}', '${phoneNumber}', '${city}', '${country}' )`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Vendor created successfully');
  });
};

// Update a vendor by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, city, country } = req.body;
  const sql = `UPDATE vendor SET name = '${name}', phoneNumber = '${phoneNumber}', city = '${city}', country = '${country}',   WHERE id = '${id}'`;
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
