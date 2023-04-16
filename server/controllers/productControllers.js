
const mysql = require('mysql');
const db = require('../config/db');

// Get all products
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one product by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM product WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new product
exports.create = (req, res) => {
  const { id, name, location, store_id } = req.body;
  const sql = `INSERT INTO product (id, name) VALUES ('${id}', '${name}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product created successfully');
  });
};

// Update a product by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { name} = req.body;
  const sql = `UPDATE product SET name = '${name}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product updated successfully');
  });
};

// Delete a product by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM product WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product deleted successfully');
  });
};
