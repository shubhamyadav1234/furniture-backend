const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ MSSQL Connected");
    return pool;
  })
  .catch(err => {
    console.error("❌ DB Connection Failed -", err.message);
    return undefined; // prevent crash
  });

module.exports = {
  sql,
  poolPromise,
};
