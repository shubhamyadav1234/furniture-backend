const { sql, poolPromise } = require("../db");

// ✅ Register User
exports.registerUser = async (req, res) => {
  const { Username, Email, Password } = req.body;

  if (!Username || !Email || !Password) {
    return res.status(400).send("❌ All fields are required.");
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Username", sql.VarChar(100), Username)
      .input("Email", sql.VarChar(150), Email)
      .input("Password", sql.VarChar(255), Password)
      .query(`INSERT INTO Users (Username, Email, Password) VALUES (@Username, @Email, @Password)`);

    res.send("✅ User registered successfully!");
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).send("❌ Server Error: " + err.message);
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send("❌ Email and Password are required");
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.VarChar(150), Email)
      .input("Password", sql.VarChar(255), Password)
      .query("SELECT * FROM Users WHERE Email = @Email AND Password = @Password");

    if (result.recordset.length === 0) {
      return res.status(401).send("❌ Invalid credentials");
    }

    const user = result.recordset[0];
    res.json({
      message: "✅ Login successful",
      user: {
        Id: user.Id,
        Username: user.Username,
        Email: user.Email,
        CreatedAt: user.CreatedAt
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).send("❌ Server Error: " + err.message);
  }
};
