
const mysql = require('mysql');
const db = require('../config/db');

// Get all invoices
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM invoice';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one invoice by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM invoice WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new invoice
exports.create = (req, res) => {
  const { id, time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id } = req.body;
  const sql = `INSERT INTO invoice (id, time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id) VALUES ('${id}', '${time_stamp}', '${payment_due_date}', '${payment_time_stamp, payment_method, customer_id}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('invoice created successfully');
  });
};

// Update an invoice by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id } = req.body;
  const sql = `UPDATE invoice SET time_stamp = '${time_stamp}', payment_due_date = '${payment_due_date}', payment_time_stamp, payment_method, customer_id = '${payment_time_stamp, payment_method, customer_id}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('invoice updated successfully');
  });
};

// Delete an invoice by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM invoice WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('invoice deleted successfully');
  });
};
