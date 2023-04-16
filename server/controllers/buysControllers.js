const mysql = require('mysql');
const db = require('../config/db');
// Get all order_products
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM buys';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one order_product by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM buys WHERE product_id = '${product_id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new order_product
exports.create = (req, res) => {
  const { product_id, invoice_id, quantity } = req.body;
  const sql = `INSERT INTO buys ( product_id, invoice_id, quantity) VALUES ('${product_id}', '${invoice_id}', '${quantity}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('order_product created successfully');
  });
};

// Update an order_product by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { invoice_id, quantity} = req.body;
  const sql = `UPDATE buys SET  invoice_id = '${invoice_id}', quatity = '${quantity}' WHERE product_id = '${product_id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('buys updated successfully');
  });
};

// Delete an order_product by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM buys WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('order_product deleted successfully');
  });
};
