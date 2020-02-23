const db = require('../service/db')

async function getDepartments() {
    return new Promise(function (resolve, reject) {
        db.connection.query('SELECT name FROM DEPARTMENT', function (err, rows, fields) {
            if (err) throw err;
            let deptNames = []
            for (var i in rows) {
                deptNames.push(rows[i].name);
            }
            resolve(deptNames);
        })
    });
}
module.exports.getDepartments = getDepartments;

async function getBudget(department) {
    return new Promise(function (resolve, reject) {
        db.connection.query(`select IFNULL(SUM(R.SALARY), 0) COST_TO_DEPT from EMP_DB.EMPLOYEE E, EMP_DB.ROLE R, EMP_DB.DEPARTMENT D 
                where E.role_id = R.id and R.DEPARTMENT_ID = D.ID and D.NAME = '${department.name}'`, function (err, rows, fields) {
            if (err) reject(`Error while getting budget for ${department.name}: ${err}`);
            resolve(rows[0].COST_TO_DEPT);
        })
    });
}
module.exports.getBudget = getBudget;


async function add(data) {
    return new Promise(
        (resolve, reject) => {
            db.connection.query(`INSERT INTO Department(name) VALUES ('${data.depName}')`, async function (err, res) {

                if (err) {
                    console.log('Error while adding Department:' + err);
                    reject('Error :' + err)
                }
                resolve(res.insertId);
            });
        }
    )
}
module.exports.add = add;

async function deleteDept(data) {
    return new Promise(
        (resolve, reject) => {
            db.connection.query(`delete from DEPARTMENT where NAME = '${data.name}'`, function (err, res) {
                if (err) reject(`Could not delete ${data.name}: ${err}`);
                resolve(res);
            });
        });
}
module.exports.deleteDept = deleteDept;