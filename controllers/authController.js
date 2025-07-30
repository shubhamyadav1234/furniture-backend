const { sql, poolPromise } = require("../db");

exports.registerUser = async (req, res) => {
  const { Username, Email, Password } = req.body;

  if (!Username || !Email || !Password) {
    return res.status(400).send("❌ All fields are required.");
  }

  try {
    const pool = await poolPromise;
    if (!pool) {
      return res.status(500).send("❌ Database connection not available.");
    }

    await pool.request()
      .input("Username", sql.VarChar(100), Username)
      .input("Email", sql.VarChar(150), Email)
      .input("Password", sql.VarChar(255), Password)
      .query("INSERT INTO Users (Username, Email, Password) VALUES (@Username, @Email, @Password)");

    res.send("✅ User registered successfully!");
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).send("❌ Server Error: " + err.message);
  }
};

exports.loginUser = async (req, res) => {
  // Add login logic or placeholder
  res.send("🔐 Login route not yet implemented.");
};
