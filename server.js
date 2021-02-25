var mysql = require("mysql");
var inquirer = require("inquirer");

require("dotenv").config();


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees"
});


connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});


function runSearch() {
inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all roles",
      "View all departments",
      "Add employee",
      "Add department",
      "Add role",
      "Update employee role",
      "Quit",
    ],
  }).then(answers => {
    switch(answers.action) {
        case "View all employees":
            allEmployees();
            break;
        case "View all roles":
            allRoles();
            break; 
        case "View all departments":
            allDepartments();
            break;   
        case "Add employee":
            addEmployee();
            break; 
        case "Add role":
            addRole();
            break;   
        case "Add department":
            addDepartment();
            break; 
        case "Update employee role":
            updateRole();
            break; 
    }
});
};

function allEmployees() {
    var query = `SELECT * FROM employee`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    });
}

function allRoles() {
    var query = `SELECT * FROM role`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    });
}

function allDepartments() {
    var query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    });
}

function addEmployee() {   
    inquirer.prompt([
          {
            type: "input",
            message: "What is their first name?",
            name: "employee_first_name",
          },
          {
            type: "input",
            message: "What is their last name?",
            name: "employee_last_name",
          },
          {
            type: "integer",
            message: "What is their role id?",
            name: "employee_id",
          },
          {
            type: "integer",
            message: "What is the manager's employee id?",
            name: "employee_manager_id",
          },
        ]).then(function (response) {
          var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
          var values = [
            response.employee_first_name,
            response.employee_last_name,
            response.employee_id,
            response.employee_manager_id,
          ];
          connection.query(query, values, function (err, res) {
            if (err) throw err;
            runSearch();
          });
        });
}

function addRole() {   
    inquirer.prompt([
          {
            type: "input",
            message: "What is the role title?",
            name: "role_title",
          },
          {
            type: "input",
            message: "What is the role salary?",
            name: "role_salary",
          },
          {
            type: "integer",
            message: "What is the role's department id?",
            name: "role_id",
          }
        ]).then(function (response) {
          var query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
          var values = [
            response.role_title,
            response.role_salary,
            response.role_id
          ];
          connection.query(query, values, function (err, res) {
            if (err) throw err;
            runSearch();
          });
        });
}

function addDepartment() {   
    inquirer.prompt([
          {
            type: "input",
            message: "What is the department's name?",
            name: "department_title",
          }
        ]).then(function (response) {
          var query = `INSERT INTO department (name) VALUES (?)`;
          var values = response.department_title;
          connection.query(query, values, function (err, res) {
            if (err) throw err;
            runSearch();
          });
        });
}

function updateRole() {  
    var query = `SELECT id, first_name, last_name FROM employee;`;
        connection.query(query, function (err, res) {
          if (err) throw err;
          const responseMap = res.map(function (array) {
            var object = {
              name: `${array.first_name} ${array.last_name}`,
              value: array.id,
            };
            return object;
          });
          var query1 = `SELECT id, title FROM role;`;
          connection.query(query1, function (err, res) {
            if (err) throw err;
            const responseMap1 = res.map(function (array) {
              var object = {
                name: `${array.title}`,
                value: array.id,
              };
              return object;
            });


        inquirer.prompt([
            {
              type: "list",
              message: "Which employee would you like to update?",
              name: "updated_id",
              choices: responseMap,
            },
            {
              type: "list",
              message: "What is the employee's new role/title?",
              name: "updated_title",
              choices: responseMap1,
            },
          ])
          .then(function (response) {
            var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
            var values = [response.updated_title, response.updated_id];
            connection.query(query, values, function (err, res) {
              if (err) throw err;
              runSearch();
            });
          });
        });
        });
    };
