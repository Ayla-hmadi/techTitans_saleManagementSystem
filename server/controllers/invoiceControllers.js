const pool = require("../config/db");

const getInvoices = async (req, res) => {
  try {
    const allInvoices = await pool.query("SELECT * FROM invoice");
    res.json(allInvoices.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await pool.query("SELECT * FROM invoice WHERE id = $1", [id]);
    res.json(invoice.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addInvoice = async (req, res) => {
  try {
    const { time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id } = req.body;

    await pool.query(
      "INSERT INTO invoice (time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id) VALUES ($1 , $2 , $3, $4, $5)",
      [time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id]
    );
    res.json("Invoice was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id } = req.body;

    await pool.query(
      "UPDATE invoice SET time_stamp = $1, payment_due_date = $2, payment_time_stamp = $3, payment_method = $4, customer_id = $5 WHERE id = $6",
      [time_stamp, payment_due_date, payment_time_stamp, payment_method, customer_id, id]
    );

    res.json(`Invoice with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM invoice WHERE id = $1", [id]);
    res.json(`Invoice with id = ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
