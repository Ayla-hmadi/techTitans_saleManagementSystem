const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  password: "12345678",
  host: "localhost",
  port: "3306",
  database: "store_management",
});
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the MySQL database");
});
connection.query("SELECT 1 + 1 AS solution", (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }
  console.log("The solution is:", results[0].solution);
});
connection.end((error) => {
  if (error) {
    console.error("Error closing the connection:", error);
    return;
  }
  console.log("Connection closed");
});
