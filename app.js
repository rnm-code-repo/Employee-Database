var mysql = require("mysql")
var inquirer = require("inquirer")
const db = require('./service/db')
const dbHelper = require('./db/helper')
const role = require('./controllers/role')
//const department = require('./db/department')
const department = require('./controllers/department')
const employee = require('./controllers/employee')
const showBanner = require('node-banner');

(async () => {
  await showBanner(`Employee \n \n 
Database \n \n
--------\n`, 'Manage your employes information', 'white', 'gray');
  start()
})();

async function start() {
  inquirer
    .prompt({
      name: "Action",
      type: "list",
      message: "What Would you like to do?",
      choices: ["View all", "View Departments", "View Roles", "View Employees", "View Employees by Manager",
        "Add Department", "Add Role", "Add Employee",
        "Update Employee Role", "Update Employee Manager",
        "Remove Employee", "Remove Role", "Remove Department",
        "Budget by Department"
      ]
    })
    .then(function (answer) {
      // based on their answer,  call the respective function

      switch (answer.Action) {
        case "View all":
          viewAll();
          break;

        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "View Employees by Manager":
          viewEmpByMgr();
          break;

        case "Budget by Department":
          viewBudget();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Update Employee Manager":
          updateEmpManager();
          break;

        case "Remove Employee":
          RemoveEmployee();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Remove Department":
          removeDepartment()
          break;

        case "exit":
          db.connection.end();
          break;
      }
    });
}

async function viewAll() {
  let records = await dbHelper.viewAll()
  console.table(records);
  start()
}

async function viewDepartments() {
  let result = await dbHelper.print("DEPARTMENT");
  start()
}

async function viewRoles() {
  let result = await dbHelper.print("ROLE");
  start()
}

async function viewEmployees() {
  let result = await dbHelper.print("EMPLOYEE");
  start()
}

async function viewEmpByMgr() {
  let result = await employee.getEmpByMgr();
  console.table(result);
  start()
}

async function viewBudget() {
  let result = await department.getBudget();
  console.log("===>" + result)
  start()
}

async function addDept() {
  await department.addDept()
  start()
}

async function addRole() {
  await role.addRole();
  start()
}

async function addEmployee() {
  await employee.addEmployee();
  start()
}

async function updateEmpRole() {
  let result = await employee.updateRole();
  console.log("===>" + result);
  start()
}

async function updateEmpManager() {
  let result = await employee.updateManager();
  console.log("===>" + result);
  start()
}

async function RemoveEmployee() {
  try {
    let result = await employee.removeEmployee();
    console.log("===>" + result);
  } catch (error) {
    console.log(error)
  }

  start()
}

async function removeRole() {
  try {
    let result = await role.removeRole();
    console.log("===>" + result);
  } catch (error) {
    console.log(error)
  }

  start()
}

async function removeDepartment() {
  try {
    let result = await department.removeDepartment();
    console.log("===>" + result);
  } catch (error) {
    console.log(error)
  }

  start()
}

//start();