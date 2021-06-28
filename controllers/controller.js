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
    console.log('check what db has received: ', data);
};

exports.addCountryToDb = addCountryToDb;
