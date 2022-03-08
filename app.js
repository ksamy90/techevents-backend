const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,");

  next();
});

app.use("/api/events", eventRoutes);

mongoose
  .connect(
    `mongodb+srv://todojs:4rHgxHQ9ABvqheRa@cluster0.xlsfe.mongodb.net/eventsapp?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
