// ✅ Use the connected sql instance from backend/db.js
const { sql } = require("../backend/db");

async function checkLicense(req, res, next) {
  try {
    const result = await sql.query`SELECT ExpiryDate FROM License WHERE Id = 1`;

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(500).json({
        success: false,
        message: "❌ License record not found in database"
      });
    }

    const expiryDate = new Date(result.recordset[0].ExpiryDate);
    const today = new Date();

    // Compare only date part (ignore time)
    const todayOnly = new Date(today.toISOString().split("T")[0]);
    const expiryOnly = new Date(expiryDate.toISOString().split("T")[0]);

    if (todayOnly > expiryOnly) {
      return res.status(403).json({
        success: false,
        message: "⚠️ License expired. Contact To The Support GS Team."
      });
    }

    // ✅ License is valid
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "License check failed: " + err.message
    });
  }
}

module.exports = checkLicense;
