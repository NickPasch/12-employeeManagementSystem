var inquirer = require("inquirer");
var mysql = require("mysql");


require("dotenv").config();


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employees"
});