const mysql = require('mysql');

const pool = mysql.createPool({
  user : "root",
  password: "12345678",
  host: "localhost",
  port: "3306",
  database: "store_management",
  connectionLimit: 10
});

module.exports = pool;
