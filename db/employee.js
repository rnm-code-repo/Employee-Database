const db = require('../service/db')

async function allemployee() {

    var query = 'SELECT e.id ,e.First_name,e.Last_name ,r.title,r.salary,d.name' +
        ' from department d, role r, employee e' +
        ' where d.id = r.department_id' +
        ' and r.id = e.role_id;';
    db.connection.query(query, function (err, res) {
        console.table(res);
        return true;
    });

}
module.exports.allemployee = allemployee;

getEmployees = function () {
    return new Promise(function (resolve, reject) {
        var query = "select concat(first_name,  ' ' ,last_name) emp_name from employee";
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let employees = []
            for (var i in rows) {
                employees.push(rows[i].emp_name);
            }
            resolve(employees);
        })
    })
}
module.exports.getEmployees = getEmployees;

getManagers = function () {
    return new Promise(function (resolve, reject) {
        var query = "select concat(first_name,  ' ' ,last_name) emp_name from employee";
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let managers = []
            for (var i in rows) {
                managers.push(rows[i].emp_name);
            }
            resolve(managers);
        })
    })
}
module.exports.getManagers = getManagers;

getEmpAndRole = function () {
    return new Promise(function (resolve, reject) {
        var query = "select concat(first_name,  ' ' ,last_name, ': ', title) emp_name from employee, role where role_id = role.id";
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let emp_role = []
            for (var i in rows) {
                emp_role.push(rows[i].emp_name);
            }
            resolve(emp_role);
        })
    })
}
module.exports.getEmpAndRole = getEmpAndRole;

getEmpAndMgr = function () {
    return new Promise(function (resolve, reject) {
        var query = `select concat(a.emp_name, ': ', a.Mgr_name) emp_mgr from(
            select concat(e.first_name,  ' ' ,e.last_name) emp_name, 
                   (select concat(me.first_name,  ' ' ,me.last_name) from emp_db.employee me where id = e.manager_id) Mgr_name from emp_db.employee e) a;`;
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let emp_mgr = []
            for (var i in rows) {
                emp_mgr.push(rows[i].emp_mgr);
            }
            resolve(emp_mgr);
        })
    })
}
module.exports.getEmpAndMgr = getEmpAndMgr;

getEmpManagers = function () {
    return new Promise(function (resolve, reject) {
        var query = "select concat(first_name,  ' ' ,last_name) emp_name from employee where id in (select manager_id from employee)";
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let managers = []
            for (var i in rows) {
                managers.push(rows[i].emp_name);
            }
            resolve(managers);
        })
    })
}
module.exports.getEmpManagers = getEmpManagers;

async function getEmpByMgr(data) {
    return new Promise(
        (resolve, reject) => {
            var query = `select * from employee where manager_id = (select id from employee where concat(first_name, ' ', last_name) = '${data.manager}')`;
            db.connection.query(query, function (err, res) {
                if (err) reject('Error:' + err);
                resolve(res);
            });
        });
}
module.exports.getEmpByMgr = getEmpByMgr;

async function addEmployee(data) {
    return new Promise(
        (resolve, reject) => {
            db.connection.query(`select id from employee where concat(first_name, ' ', last_name) = '${data.manager}'`, function (err, rows, fields) {
                var managerId = (rows[0].id);
                db.connection.query(
                    `insert into employee(first_name, last_name, role_id, manager_id) 
                values('${data.firstname}', '${data.lastname}', 
                (select id from role where title = '${data.role}'), '${managerId}')`, async function (err, res) {
                        if (err) throw err;
                        resolve(res.insertId);
                    }
                )
            });
        });
}
module.exports.addEmployee = addEmployee;

async function updateRole(data) {
    return new Promise(
        (resolve, reject) => {
            let empName = (data.employee).split(":")[0];
            db.connection.query(`update employee set role_id = (select id from role where title = '${data.role}') where concat(first_name, ' ', last_name) = '${empName}'`, function (err, res) {
                if (err) reject(`Could not update role of employee ${data.employee}: ${err}`);
                resolve(`${empName} role updated to ${data.role}`);
            });
        });
}
module.exports.updateRole = updateRole;

async function updateManager(data) {
    return new Promise(
        (resolve, reject) => {
            let empName = (data.employee).split(":")[0];
            
            db.connection.query(`select id from employee where concat(first_name, ' ', last_name) = '${data.manager}'`, function (err, rows, fields) {
                var managerId = (rows[0].id);
                db.connection.query(`update employee set manager_id = ${managerId} where concat(first_name, ' ', last_name) = '${empName}'`, function (err, res) {
                    if (err) reject(`Could not update manager of employee ${data.employee}: ${err}`);
                    resolve(`${empName} moved user new manager: ${data.manager}`);
                });
            });
        });
}
module.exports.updateManager = updateManager;

async function deleteEmp(data) {
    return new Promise(
        (resolve, reject) => {
            db.connection.query(`delete from employee where concat(first_name, ' ', last_name) = '${data.name}'`, function (err, res) {
                if (err) reject(`Canot delete ${data.name}, found reportees`);
                resolve(res);
            });
        });
}
module.exports.deleteEmp=deleteEmp;