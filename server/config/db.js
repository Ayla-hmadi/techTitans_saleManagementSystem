const mysql = require('mysql');

const pool = mysql.createPool({
  user : "Adam",
  password: "12345678",
  host: "localhost",
  port: "3306",
  database: "tech_titans",
  connectionLimit: 10
});

module.exports = pool;
