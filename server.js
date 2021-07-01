const express = require("express");

const taskController = require("./controllers/controller");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.listen(4000);

app.post("/api/countries/add", (req, res) => {
  // console.log("From the brain I present:", req.body);
  taskController.addCountryToDb(req.body);
});
app.post('/api/countries', taskController.getCountry)

app.post("/api/removedCountry", (req, res) => {
  console.log("From the brain I present:", req.body);

  taskController.deleteInDatabase(req.body);
});
