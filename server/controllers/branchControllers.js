
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
  const { id, storeId, road, city, country, openingDate, phoneNumber} = req.body;
  const sql = `INSERT INTO branch (id, storeId, road, city, country, openingDate, phoneNumber) VALUES ('${id}', '${storeId}', '${road}', '${city}', '${country}', '${openingDate}', '${phoneNumber}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Branch created successfully');
  });
};

// Update a branch by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { storeId, road, city, country, openingDate, phoneNumber } = req.body;
  const sql = `UPDATE branch SET storeId = '${storeId}', road = '${road}', city = '${city}', country = '${country}', openingDate = '${openingDate}', phoneNumber = '${phoneNumber}',  WHERE id = '${id}'`;
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
