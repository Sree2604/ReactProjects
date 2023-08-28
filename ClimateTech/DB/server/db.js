const Pool = require('pg').Pool;
const pool =new Pool({
    user:"postgres",
    password:"12345",
    database:"test1",
    port:5432,
    host:"localhost"
});

module.exports = pool;