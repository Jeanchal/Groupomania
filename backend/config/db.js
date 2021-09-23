require("dotenv").config({ path: "./config/.env" });
const mysql = require("mysql2");

const dbMysql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

let sql = "SELECT * FROM Users";

dbMysql.query(sql, (err, result) => {
  if (err) throw err;
  // console.log(result);
  console.log("Mysql Connected");
});

module.exports = dbMysql;
