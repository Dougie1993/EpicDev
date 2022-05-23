const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const config = require("./config/config")
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Epic Dev application." });
});

require('./routes/routes')(app)

// handle 404 request
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// Start db instance and serve. Forced true to drop tables whenever server restarts
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}.`);
    });
}).catch(err => {
  console.error('unable to connect ', err.message)
});

