require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  next();
});
app.use('/', require('./routes'));
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB, listening at port ' + (port));
    });
  }
});