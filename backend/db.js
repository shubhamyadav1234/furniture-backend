// const sql = require("mssql");

// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     server: process.env.DB_SERVER,
//     database: process.env.DB_DATABASE,
//     options: {
//         encrypt: process.env.DB_ENCRYPT === "true",
//         trustServerCertificate: true
//     }
// };

// async function connectDB() {
//     try {
//         await sql.connect(config);
//         console.log("Connected to SQL Server");
//     } catch (err) {
//         console.error("Database connection failed:", err);
//     }
// }

// module.exports = { sql, connectDB };














const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("✅ Connected to SQL Server");
    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
}

module.exports = { sql, connectDB };

