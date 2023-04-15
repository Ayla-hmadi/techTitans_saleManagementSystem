const pool = require("../config/db");

const getCustomers = async (req, res) => {
  try {
    const allCustomers = await pool.query("SELECT * FROM customer");
    res.json(allCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query("SELECT * FROM customer WHERE id = $1", [
      id,
    ]);
    res.json(customer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const createCustomer = async (req, res) => {
  try {
    const { id, name, phone_number } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customer (id, name, phone_number) VALUES ($1, $2, $3) RETURNING *",
      [id, name, phone_number]
    );
    res.json(newCustomer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number } = req.body;
    const updatedCustomer = await pool.query(
      "UPDATE customer SET name = $1, phone_number = $2 WHERE id = $3 RETURNING *",
      [name, phone_number, id]
    );
    res.json(updatedCustomer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM customer WHERE id = $1", [id]);
    res.json(`Customer with id ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
