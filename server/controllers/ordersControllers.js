const mysql = require('mysql');
const db = require('../config/db');
// Get all order_products
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one order_product by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM orders WHERE WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new order_product
exports.create = (req, res) => {
  const { id, invoiceId, customerId, expectedDeliveryDate } = req.body;
  const sql = `INSERT INTO orders ( id, invoiceId, customerId, expectedDeliveryDate) VALUES ('${id}','${invoiceId}', '${customerId}', '${expectedDeliveryDate}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('order created successfully');
  });
};

// Update an order_product by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { invoiceId, customerId, expectedDeliveryDate} = req.body;
  const sql = `UPDATE orders SET  invoiceId = '${invoiceId}', customerId = '${customerId}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('orders updated successfully');
  });
};

// Delete an order_product by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM orders WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('order deleted successfully');
  });
};
