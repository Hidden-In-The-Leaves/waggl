const { Client, Pool } = require("pg");

const credentials = {
  user: "postgres",
  database: "sdc_curium",
  password: "postgres",
};

const pool = new Pool(credentials);
module.exports = pool;
