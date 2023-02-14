const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Middleware = require("./midleware");
const Database = require("./database");
const Routing = require("./src/routing");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Midleware ====

Middleware({ app, bodyParser, cors, passport, LocalStrategy, express });
//  end Middleware ====

// Routing ======
Routing(app);
// end Routing =====

Database.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
)
  .catch(err => {
    console.log("err", err)
  })

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is Running in ${PORT}`);
});
