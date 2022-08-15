const { Pool } = require("pg");

const credentials = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
};

const pool = new Pool(credentials);
module.exports = pool;
