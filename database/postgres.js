const { Pool } = require("pg");

const credentials = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
};

const pool = new Pool(credentials);
module.exports = pool;
