var inquirer = require("inquirer")
const department = require('../db/department')
const dbHelper = require('../db/helper')

async function addDept() {
    return new Promise(
        (resolve, reject) => {
            inquirer
                .prompt([{
                    name: "depName",
                    type: "input",
                    message: "What Department to do want to add?",
                }])
                .then(async function (answer) {
                    let deptId = await department.add(answer)
                    console.log(`Created new Departmen: "${answer.depName}" with ID:${deptId}`)
                    await dbHelper.print("Department");
                    resolve(deptId)
                });
        });
}
module.exports.addDept=addDept;

async function getBudget() {
    return new Promise(
        async (resolve, reject) => {
            var departments = await department.getDepartments();

            inquirer
                .prompt({
                    name: "name",
                    type: "list",
                    message: "Select a department to view budget",
                    choices: departments
                }).then(async function (name) {
                    try {
                        let result = await department.getBudget(name);
                        resolve(`Budget for deparment ${name.name} is $${result}`);
                    } catch (error) {
                        reject(error)
                    }
                })
        }
    )
}
module.exports.getBudget = getBudget

async function removeDepartment() {
    return new Promise(
        async (resolve, reject) => {
            var departments = await department.getDepartments();

            inquirer
                .prompt({
                    name: "name",
                    type: "list",
                    message: "Select a department that you want remove",
                    choices: departments
                }).then(async function (name) {
                    try {
                        let result = await department.deleteDept(name);
                        resolve(`Removed deparment: ${name.name}`);
                    } catch (error) {
                        reject(error)
                    }
                })
        }
    )
}
module.exports.removeDepartment = removeDepartment
