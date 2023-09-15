const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "sreearangs2604",
  database: "zemlia",
  port: 5432,
  host: "localhost",
});

module.exports = pool;
