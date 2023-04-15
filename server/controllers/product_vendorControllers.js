const pool = require("../config/db");

// Get all product vendors
const getProductVendors = async (req, res) => {
  try {
    const allProductVendors = await pool.query("SELECT * FROM product_vendor");
    res.json(allProductVendors.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// Get product vendor by ID
const getProductVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const productVendor = await pool.query(
      "SELECT * FROM product_vendor WHERE id = $1",
      [id]
    );
    res.json(productVendor.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// Add new product vendor
const addProductVendor = async (req, res) => {
  try {
    const { product_id, vendor_id, price } = req.body;

    await pool.query(
      "INSERT INTO product_vendor (product_id, vendor_id, price) VALUES ($1 , $2 , $3)",
      [product_id, vendor_id, price]
    );
    res.json("Product vendor was added!");
  } catch (err) {
    console.error(err.message);
  }
};

// Update product vendor by ID
const updateProductVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, vendor_id, price } = req.body;

    await pool.query(
      "UPDATE product_vendor SET product_id = $1, vendor_id = $2, price = $3 WHERE id = $4",
      [product_id, vendor_id, price, id]
    );

    res.json(`Product vendor with ID = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

// Delete product vendor by ID
const deleteProductVendor = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM product_vendor WHERE id = $1", [id]);
    res.json(`Product vendor with ID = ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getProductVendors,
  getProductVendorById,
  addProductVendor,
  updateProductVendor,
  deleteProductVendor,
};
