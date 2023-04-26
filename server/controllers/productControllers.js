
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
  const { id, vendorId, name, Description } = req.body;
  const sql = `INSERT INTO product (id, vendorId, name, Description ) VALUES ('${id}', '${vendorId}', '${name}','${Description}',)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product created successfully');
  });
};

// Update a product by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { vendorId, name, Description} = req.body;
  const sql = `UPDATE product SET vendorId = '${vendorId}', name = '${name}', Description = '${Description}'`;
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
