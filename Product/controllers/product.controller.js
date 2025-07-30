const { sql, poolPromise } = require("../../db");

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Get Products Error:", err.message);
    res.status(500).send("❌ Server Error: " + err.message);
  }
};
