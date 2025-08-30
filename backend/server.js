// 




















const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./db");   // ✅ correct (same folder)
const checkLicense = require("../middleware/checkLicense"); // ✅ Import middleware

// Connect only once at startup
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server connection (kept for safety, but connectDB already connects)
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: true,
  },
};

sql.connect(dbConfig)
  .then(() => console.log("✅ Connected to SQL Server (server.js)"))
  .catch((err) => console.log("❌ Database connection failed: ", err));

// ================== ROUTES ==================

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Elegant Furniture API is running!");
});

// Register route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await sql.query`INSERT INTO Users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE email=${email} AND password=${password}`;
    if (result.recordset.length > 0) {
      res.json({ message: "Login successful!" });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
});

// ================== ORDER ROUTE ==================
app.post("/api/order", checkLicense, async (req, res) => {
  const { customerName, phone, address } = req.body;

  if (!customerName || !phone || !address) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    await sql.query`
      INSERT INTO Orders (CustomerName, Phone, Address)
      VALUES (${customerName}, ${phone}, ${address})
    `;
    res.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
