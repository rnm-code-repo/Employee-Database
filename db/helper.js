const db =  require('../service/db')

async function print(tab) {
    const query = "SELECT * FROM " + tab;
    db.connection.query(query, async (err, res) => {
      console.table(res);
      return true;
    });
  
  }

  module.exports.print=print;
