const db = require('../service/db')

async function addRole(answer) {
    db.connection.query(`insert into role (role_title, role_salary, department_id) 
    values('${answer.roletitle}', '${answer.rolesalary}', (select id from department where dep_name='${answer.addingRole}'))`, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(`New role :${answer.roletitle} created with ID: ` + res.insertId );
        return true;
    });
}
module.exports.addRole=addRole;

getRoles = function(){
    return new Promise(function(resolve, reject){
        var query = 'select ROLE_TITLE from role';
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
          }
      )}
  )}
module.exports.getRoles=getRoles;