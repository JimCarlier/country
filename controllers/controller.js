const sqlite3 = require("sqlite3").verbose();

// BACKEND FILE FOR MY DATABASES QUERIES
const addCountryToDb = (data) => {
  console.log("From the server I present:", data);
  let db = new sqlite3.Database('db/myCountry.db');
    // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
    db.run(`INSERT INTO countries(location, restrictions) VALUES (?, ?)`, [data.location,data.restriction], function(err) {
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  
    // console.log(movie.title)
    db.close();
    // console.log('check what db has received: ', data);
};
const deleteInDatabase = (data) => {
  console.log("From the server I present:", data);
  let db = new sqlite3.Database('db/myCountry.db');
    db.run(`DELETE FROM countries WHERE id = ${data.remId}`)
    // db.run(`INSERT INTO countries(location, restrictions) VALUES (?, ?)`, [data.location,data.restriction], function(err) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     // get the last insert id
    //     console.log(`A row has been inserted with rowid ${this.lastID}`);
    // });
  
    // console.log(movie.title)
    db.close();
    // console.log('check what db has received: ', data);
}

const getCountry = (req, res) => {

  let sendData = {data: []};

  let db = new sqlite3.Database('db/myCountry.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    // console.log('Connected to the coutntry database.');
  });
   db.serialize(() => {
    db.each(`SELECT * FROM countries`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      // console.log(row)
      sendData.data.push(row)

    });
    // console.log(sendData)
    // res.send(sendData)
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    // console.log(sendData)
    res.send(sendData)
    console.log('Close the database connection.');
  });

}

exports.addCountryToDb = addCountryToDb;
exports.getCountry = getCountry;
exports.deleteInDatabase = deleteInDatabase; 
