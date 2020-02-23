var inquirer = require("inquirer")
const dbHelper = require('../db/helper')
const role = require('../db/role')
const employee = require('../db/employee')

async function getEmpByMgr() {
    return new Promise(
        async(resolve, reject) => {
            var managers = await employee.getEmpManagers();

            inquirer
                .prompt({
                             name: "manager",
                                 type: "list",
                                 message: "Select a Managre to view his reports",
                                 choices: managers
                        }
                        ).then(async function(manager) {
                            let result = await employee.getEmpByMgr(manager);
                            resolve(result);
                        })
        }
    )
}
module.exports.getEmpByMgr=getEmpByMgr

async function addEmployee() {
    return new Promise(
        async(resolve, reject) => {
            var roles = await role.getRoles();

            var managers = await employee.getManagers();

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
                    let empId = await employee.addEmployee(data)
                    console.log(`Created new Employee: "${data.firstname}  ${data.lastname}"  with ID:${empId}`)
                    await dbHelper.print("employee")
                    resolve(empId);
                });
        }
    )
}
module.exports.addEmployee=addEmployee;

async function updateRole() {
    return new Promise(
        async (resolve, reject) => {
            var emp_role = await employee.getEmpAndRole();
            var roles = await role.getRoles();
            inquirer
                .prompt([{
                    name: "employee",
                    type: "list",
                    message: "Select the employee (showing enployee with their current role)",
                    choices: emp_role
                }, {
                    name: "role",
                    type: "list",
                    message: "Select the new role",
                    choices: roles
                }
            ]).then(async function (data) {
                    let result = await employee.updateRole(data);
                    resolve(result);
                })
        }
    )
}
module.exports.updateRole = updateRole

async function updateManager() {
    return new Promise(
        async (resolve, reject) => {
            var emp_mgr = await employee.getEmpAndMgr();
            var managers = await employee.getManagers();
            inquirer
                .prompt([{
                    name: "employee",
                    type: "list",
                    message: "Select the employee (showing enployee with their current manager)",
                    choices: emp_mgr
                }, {
                    name: "manager",
                    type: "list",
                    message: "Select new manager",
                    choices: managers
                }
            ]).then(async function (data) {
                    let result = await employee.updateManager(data);
                    resolve(result);
                })
        }
    )
}
module.exports.updateManager = updateManager

async function removeEmployee() {
    return new Promise(
        async (resolve, reject) => {
            var employees = await employee.getEmployees();

            inquirer
                .prompt({
                    name: "name",
                    type: "list",
                    message: "Select a Managre to view their reportees",
                    choices: employees
                }).then(async function (name) {
                    try {
                        let result = await employee.deleteEmp(name);
                        resolve(` Removed employee: ${name.name}`);
                    } catch (error) {
                        reject(error)
                    }
                    
                })
        }
    )
}
module.exports.removeEmployee = removeEmployee

