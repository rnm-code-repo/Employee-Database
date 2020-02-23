const db = require('../service/db')

async function addRole(answer) {
    return new Promise( 
        (resolve, reject) => {
            db.connection.query(`insert into role (title, salary, department_id) 
            values('${answer.roletitle}', '${answer.rolesalary}', (select id from department where name='${answer.addingRole}'))`, function (err, res) {
                if (err) {
                    console.log(err);
                }
                //console.log(`New role :${answer.roletitle} created with ID: ` + res.insertId );
                resolve(res.insertId)
            });
    });
}
module.exports.addRole=addRole;

getRoles = function(){
    return new Promise(function(resolve, reject){
        var query = 'select title from role';
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            let roles = []
            for (var i in rows) {
                roles.push(rows[i].title);
            }
            resolve(roles);
          }
      )}
  )}
module.exports.getRoles=getRoles;

async function deleteRole(data) {
    return new Promise(
        (resolve, reject) => {
            db.connection.query(`delete from ROLE where TITLE = '${data.name}'`, function (err, res) {
                if (err) reject(`Could not delete ${data.name}: ${err}`);
                resolve(res);
            });
        });
}
module.exports.deleteRole = deleteRole;