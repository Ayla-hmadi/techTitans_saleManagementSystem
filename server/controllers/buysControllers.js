const pool = require("../config/db");

const getBuys = async (req, res) => {
  try {
    const allBuys = await pool.query("SELECT * FROM buys");
    res.json(allBuys.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const buy = await pool.query("SELECT * FROM buys WHERE buy_id = $1", [id]);
    res.json(buy.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const addBuy = async (req, res) => {
  try {
    const { date, product_id, quantity, vendor_id } = req.body;

    await pool.query(
      "INSERT INTO buys (date, product_id, quantity, vendor_id) VALUES ($1 , $2 , $3, $4)",
      [date, product_id, quantity, vendor_id]
    );
    res.json("Buy was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, product_id, quantity, vendor_id } = req.body;
    await pool.query(
      "UPDATE buys SET date = $1 , product_id = $2 , quantity = $3, vendor_id = $4 WHERE buy_id = $5",
      [date, product_id, quantity, vendor_id, id]
    );

    res.json(`Buy with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteBuy = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM buys WHERE buy_id = $1", [id]);
    res.json(`Buy with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getBuys,
  getBuy,
  addBuy,
  updateBuy,
  deleteBuy,
};
