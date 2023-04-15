const pool = require("../config/db");

const getAllBranchProducts = async (req, res) => {
  try {
    const { branch_id } = req.query;
    const products = await pool.query(
      "SELECT p.id, p.name, o.quantity, o.price FROM owns o JOIN product p ON o.product_id = p.id WHERE o.branch_id = $1",
      [branch_id]
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addBranchProduct = async (req, res) => {
  try {
    const { branch_id, product_id, quantity, price } = req.body;

    await pool.query(
      "INSERT INTO owns (branch_id, product_id, quantity, price) VALUES ($1 , $2 , $3, $4)",
      [branch_id, product_id, quantity, price]
    );
    res.json("Product was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateBranchProduct = async (req, res) => {
  try {
    const { branch_id, product_id } = req.query;
    const { quantity, price } = req.body;
    await pool.query(
      "UPDATE owns SET quantity = $1 , price = $2 WHERE branch_id = $3 AND product_id = $4",
      [quantity, price, branch_id, product_id]
    );

    res.json(`Product with id = ${product_id} in branch ${branch_id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteBranchProduct = async (req, res) => {
  try {
    const { branch_id, product_id } = req.query;
    await pool.query("DELETE FROM owns WHERE branch_id = $1 AND product_id = $2", [branch_id, product_id]);
    res.json(`Product with id = ${product_id} in branch ${branch_id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAllBranchProducts,
  addBranchProduct,
  updateBranchProduct,
  deleteBranchProduct,
};
