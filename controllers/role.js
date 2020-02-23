var inquirer = require("inquirer")
const dbHelper = require('../db/helper')
const role = require('../db/role')
const department = require('../db/department')

async function addRole() {
    return new Promise(
        async (resolve, reject) => {
            var deptNames = await department.getDepartments();

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
                    let roleId = await role.addRole(data);
                    console.log(`Created new Role: "${data.roletitle}" with ID:${roleId}`)
                    await dbHelper.print("role");
                    resolve(roleId);
                });
        }
    )
}
module.exports.addRole=addRole;

async function removeRole() {
    return new Promise(
        async (resolve, reject) => {
            var roles = await role.getRoles();

            inquirer
                .prompt({
                    name: "name",
                    type: "list",
                    message: "Select a Managre to view his reports",
                    choices: roles
                }).then(async function (name) {
                    try {
                        let result = await role.deleteRole(name);
                        resolve(` Removed role: ${name.name}`);
                    } catch (error) {
                        reject(error)
                    }

                })
        }
    )
}
module.exports.removeRole = removeRole