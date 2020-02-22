var mysql = require("mysql")
var inquirer = require("inquirer")
const db = require('./service/db')
const helper = require('./db/helper')
const role = require('./db/role')
const department = require('./db/department')
const employee = require('./db/employee')


async function start() {
  inquirer
    .prompt({
      name: "Action",
      type: "list",
      message: "What Would you like to do?",
      choices: ["view all Employees", "Add Department", "Add Role", "Add Employee", "Remove Employee", "Update employee"]
    })
    .then(function (answer) {
      // based on their answer,  call the respective function

      switch (answer.Action) {
        case "view all Employees":
          showAllEmp();
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

        case "Remove Employee":
          Removeemployee();
          break;

        case "Update employee":
          updateemployee();
          break;

        case "exit":
          db.connection.end();
          break;
      }
    });
}

async function showAllEmp() {
  var query = 'SELECT e.id ,e.First_name,e.Last_name ,r.role_title,r.role_salary,d.dep_name' +
    ' from department d, role r, employee e' +
    ' where d.id = r.department_id' +
    ' and r.id = e.role_id;';
  db.connection.query(query, function (err, res) {
    console.table(res);
    start();
  });

  //console.log('calling start');

}

async function getDept() {
  var deptNames = [];
  render = function (rows) {
    //console.log(rows);
    for (var i in rows) {
      deptNames.push(rows[i].DEP_NAME);
    }
    console.log(deptNames);
    return deptNames;
  }
  console.log(deptNames);
  var result = await department.getDepartments().then(function (result) {
    //console.log(result);
    render(result);
  }).catch(function (err) {
    console.log("Promise rejection error: " + err);
  });

}

function addDept() {

  inquirer
    .prompt([{
      name: "depName",
      type: "input",
      message: "What Department to do want to add?",
    }])
    .then(function (answer) {
      db.connection.query(`INSERT INTO Department(dep_name) VALUES ('${answer.depName}')`, function (err, res) {

        if (err) {
          console.log('Error while adding Department:' + err);
          start();

        }

        console.log(`Added Department ${answer.depName}`);

        helper.print("Department");
        start();
      });
    });
}

async function addRole() {

  var deptNames = [];
  console.log(deptNames);
  render = function (rows) {
    //console.log(rows);
    for (var i in rows) {
      deptNames.push(rows[i].DEP_NAME);
    }
  }
  var result = await department.getDepartments().then(function (result) {
    //console.log(result);
    render(result);
  }).catch(function (err) {
    console.log("Promise rejection error: " + err);
  });


  inquirer
    .prompt([{
        name: "addingRole",
        type: "list",
        message: "What Department Would you like to add?",
        choices: deptNames
      },
      {
        name: "roletitle",
        type: "input",
        message: "What title do you want to add?",
      },
      {
        name: "rolesalary",
        type: "input",
        message: "What salary do you want to add?",
      }
    ])
    .then(async function (data) {
      await role.addRole(data);
      await helper.print("role");
      await start();
      /*
      db.connection.query(`insert into role (role_title, role_salary, department_id) 
            values('${answer.roletitle}', '${answer.rolesalary}', (select id from department where dep_name='${answer.addingRole}'))`, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(`New role :${answer.roletitle} created`);
        helper.print("role");
        start()
      });*/
    });

  //});
}

async function addEmployee() {
  var roles = [];
  renderRoles = function (rows) {
    //console.log(rows);
    for (var i in rows) {
      roles.push(rows[i].ROLE_TITLE);
    }
  }
  var result = await role.getRoles().then(function (result) {
    //console.log(result);
    renderRoles(result);
  }).catch(function (err) {
    console.log("Promise rejection error: " + err);
  });

  var managers = [];
  renderManagers = function (rows) {
    //console.log(rows);
    for (var i in rows) {
      managers.push(rows[i].emp_name);
    }
  }
  var result = await employee.getManagers().then(function (result) {
    //console.log(result);
    renderManagers(result);
  }).catch(function (err) {
    console.log("Promise rejection error: " + err);
  });

  inquirer
    .prompt([{
        name: "firstname",
        type: "input",
        message: "What is employees first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is employees last name?",
      },
      {
        name: "manager",
        type: "list",
        message: "Who is employees manager?",
        choices: managers
      }, {
        name: "role",
        type: "list",
        message: "Choose a role for new employee?",
        choices: roles
      }
    ])
    .then(async function (data) {
      await employee.addEmployee(data).then(
        await helper.print("employee")).then(start());
    });
}

start();