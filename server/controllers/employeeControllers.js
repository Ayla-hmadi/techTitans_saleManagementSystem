
const mysql = require('mysql');
const db = require('../config/db');

// Get all employees
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Get one employee by ID
exports.getOne = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM employee WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

// Create a new employee
exports.create = (req, res) => {
  const { id, branchId, firstName, lastName, phoneNumber,  salary, position, managerId, joinDate } = req.body;
  const sql = `INSERT INTO employee (id, branchId, firstName, lastName, phoneNumber,  salary, position, managerId, joinDate ) VALUES ('${id}', '${branchId}', '${firstName}', '${lastName}', '${phoneNumber}', '${salary}', '${position}', '${managerId}', '${joinDate}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('employee created successfully');
  });
};

// Update an employee by ID
exports.update = (req, res) => {
  const { id } = req.params;
  const { branchId, firstName, lastName, phoneNumber,  salary, position, managerId, joinDate } = req.body;
  const sql = `UPDATE employee SET branchId = '${branchId}', firstName = '${firstName}',lastName= '${lastName}' phoneNumber = '${phoneNumber}', salary = '${salary}', position = '${position}', managerId = '${managerId}', joinDate = '${joinDate}' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('employee updated successfully');
  });
};

// Delete an employee by ID
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM employee WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('employee deleted successfully');
  });
};
