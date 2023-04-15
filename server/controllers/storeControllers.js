const pool = require("../config/db");

const getStores = async (req, res) => {
  try {
    const allStores = await pool.query("SELECT * FROM store");
    res.json(allStores.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getStore = async (req, res) => {
  try {
    const { id } = req.query;
    const store = await pool.query("SELECT * FROM store WHERE id = $1", [id]);
    res.json(store.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addStore = async (req, res) => {
  try {
    const { id, name } = req.body;

    await pool.query(
      "INSERT INTO store (id, name) VALUES ($1 , $2)",
      [id, name]
    );
    res.json("Store was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateStore = async (req, res) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    await pool.query(
      "UPDATE store SET name = $1 WHERE id = $2",
      [name, id]
    );

    res.json(`Store with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteStore = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM store WHERE id = $1", [id]);
    res.json(`Store with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getStores,
  getStore,
  addStore,
  updateStore,
  deleteStore,
};
