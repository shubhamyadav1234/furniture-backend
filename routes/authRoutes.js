// routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Example controller (make sure this exists or replace with inline logic)
const { registerUser } = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", registerUser);  // ✅ This line is CRUCIAL

module.exports = router;
