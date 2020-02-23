const db =  require('../service/db')

async function print(tab) {
 return new Promise(
     (resolve, reject) => {
    const query = "SELECT * FROM " + tab;
      db.connection.query(query, async (err, res) => {
        console.table(res);
        resolve('Done with table display')
      });
    });
  }
  module.exports.print=print;

  async function viewAll() {
    return new Promise(
        (resolve, reject) => {
          var query = 'SELECT e.id ,e.First_name,e.Last_name ,r.title,r.salary,d.name' +
            ' from department d, role r, employee e' +
            ' where d.id = r.department_id' +
            ' and r.id = e.role_id;';
          db.connection.query(query, function (err, res) {
            //console.table(res);
            resolve(res)
          });
        });
  }
  module.exports.viewAll = viewAll;
