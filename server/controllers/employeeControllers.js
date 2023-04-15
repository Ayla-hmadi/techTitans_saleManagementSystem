const pool = require("../config/db");

const getEmployees = async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employee");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    const employee = await pool.query(
      "SELECT * FROM employee WHERE id = $1",
      [id]
    );
    res.json(employee.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addEmployee = async (req, res) => {
  try {
    const {
      id,
      name,
      phone_number,
      position,
      salary,
      branch_id,
    } = req.body;

    await pool.query(
      "INSERT INTO employee (id, name, phone_number, position, salary, branch_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, name, phone_number, position, salary, branch_id]
    );
    res.json("Employee was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      name,
      phone_number,
      position,
      salary,
      branch_id,
    } = req.body;
    await pool.query(
      "UPDATE employee SET name = $1, phone_number = $2, position = $3, salary = $4, branch_id = $5 WHERE id = $6",
      [name, phone_number, position, salary, branch_id, id]
    );

    res.json(`Employee with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM employee WHERE id = $1", [id]);
    res.json(`Employee with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
