const Pool = require('pg').Pool;
const pool =new Pool({
    user:"postgres",
    password:"12345678",
    database:"postgres",
    port:5432,
    host:"localhost"
});

module.exports = pool;