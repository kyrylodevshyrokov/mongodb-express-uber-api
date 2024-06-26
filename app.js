const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();
const status = require('http-status')

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/muber");
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(status.UNPROCESSABLE_ENTITY).send({ error: err._message });
});

module.exports = app;
