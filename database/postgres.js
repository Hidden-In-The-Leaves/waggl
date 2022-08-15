const { Pool } = require("pg");
// const dotenv = require('dotenv');
// dotenv.config();
console.log(process.env.PGUSER);
console.log(process.env.PGDATABASE);
console.log(process.env.PGPASSWORD);
const credentials = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
};

const pool = new Pool(credentials);
module.exports = pool;
