const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM product");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await pool.query("SELECT * FROM product WHERE product_id = $1", [
      id,
    ]);
    res.json(product.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, vendor_id, price, quantity } = req.body;

    await pool.query(
      "INSERT INTO product (name, description, vendor_id, price, quantity) VALUES ($1 , $2 , $3, $4, $5)",
      [name, description, vendor_id, price, quantity]
    );
    res.json("Product was added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description, vendor_id, price, quantity } = req.body;
    await pool.query(
      "UPDATE product SET name = $1 , description = $2 , vendor_id = $3, price = $4, quantity = $5 WHERE product_id = $6",
      [name, description, vendor_id, price, quantity, id]
    );

    res.json(`Product with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM product WHERE product_id = $1", [id]);
    res.json(`Product with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
