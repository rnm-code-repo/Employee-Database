const db = require('../service/db')

getDepartments = function(){
    return new Promise(function(resolve, reject){
        db.connection.query('SELECT DEP_NAME FROM DEPARTMENT', function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
          }
      )}
  )}
/*
async function getDepartments() {
    var deptNames = [];
    db.connection.query('SELECT DEP_NAME FROM DEPARTMENT', (err, result) => {
        return result.rows;
    });
    console.log('here=====');
    
    return new Promise(function(resolve, reject){
        db.connection.query(
            "SELECT Name, Surname FROM Employee", 
            function(err, rows){                                                
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
        )}

    /*, function (err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            deptNames.push(rows[i].DEP_NAME);
        }
        console.log(deptNames)
        return deptNames;
    });*/
//}

module.exports.getDepartments=getDepartments;