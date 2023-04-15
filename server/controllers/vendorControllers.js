const pool = require("../config/db");

// Get all vendors
const getVendors = async (req, res) => {
  try {
    const allVendors = await pool.query("SELECT * FROM vendor");
    res.json(allVendors.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a vendor by ID
const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await pool.query("SELECT * FROM vendor WHERE id = $1", [id]);
    if (vendor.rows.length === 0) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    res.json(vendor.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add a new vendor
const addVendor = async (req, res) => {
  try {
    const { id, name, phone_number } = req.body;

    // Check if vendor already exists
    const existingVendor = await pool.query("SELECT * FROM vendor WHERE id = $1", [id]);
    if (existingVendor.rows.length !== 0) {
      return res.status(400).json({ msg: "Vendor already exists" });
    }

    // Insert new vendor
    await pool.query("INSERT INTO vendor (id, name, phone_number) VALUES ($1, $2, $3)", [
      id,
      name,
      phone_number,
    ]);
    res.json("Vendor was added!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a vendor
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number } = req.body;

    // Check if vendor exists
    const existingVendor = await pool.query("SELECT * FROM vendor WHERE id = $1", [id]);
    if (existingVendor.rows.length === 0) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    // Update vendor
    await pool.query("UPDATE vendor SET name = $1, phone_number = $2 WHERE id = $3", [
      name,
      phone_number,
      id,
    ]);
    res.json(`Vendor with ID ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a vendor
const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if vendor exists
    const existingVendor = await pool.query("SELECT * FROM vendor WHERE id = $1", [id]);
    if (existingVendor.rows.length === 0) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    // Delete vendor
    await pool.query("DELETE FROM vendor WHERE id = $1", [id]);
    res.json(`Vendor with ID ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
};
