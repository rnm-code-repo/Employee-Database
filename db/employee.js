const db = require('../service/db')

async function allemployee() {

    var query = 'SELECT e.id ,e.First_name,e.Last_name ,r.role_title,r.role_salary,d.dep_name' +
        ' from department d, role r, employee e' +
        ' where d.id = r.department_id' +
        ' and r.id = e.role_id;';
    db.connection.query(query, function (err, res) {
        console.table(res); 
        return true;
    });
    
}
module.exports.allemployee=allemployee;

getManagers = function(){
    return new Promise(function(resolve, reject){
        var query = "select concat(first_name,  ' ' ,last_name) emp_name from employee where id in (select distinct manager_id from employee)";
        db.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
          }
      )}
  )}
module.exports.getManagers=getManagers;

async function addEmployee(data) {
    
    db.connection.query(`select id from employee where concat(first_name, ' ', last_name) = '${data.manager}'`, function(err, rows, fields) {
        //console.log(rows);
        var managerId = (rows[0].id);
        //console.log("manager ID==>" + managerId);
        db.connection.query(
            `insert into employee(first_name, last_name, role_id, manager_id) 
            values('${data.firstname}', '${data.lastname}', 
            (select id from role where role_title = '${data.role}'), '${managerId}')`, async function(err, res) {
                if (err) throw err;
                console.log('Emloyee added successfully with ID :' + res.insertId );
                return(res);
            }
        )
    });
    
    
}
module.exports.addEmployee=addEmployee;