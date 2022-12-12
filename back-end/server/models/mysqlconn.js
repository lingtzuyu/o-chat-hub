// 測試
const mysql = require('mysql2');
require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_CONNLIMIT,
} = process.env;

// connects to DB
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  port: DB_PORT,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  connectionLimit: DB_CONNLIMIT,
});

const sqlDB = pool.promise();

// FIXME: 待刪除mysql
module.exports = { mysql, sqlDB };
