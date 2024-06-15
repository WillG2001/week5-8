require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://week5-8-ags6.onrender.com',
  clientID: 'GZPFeQBiwhhPmihPVrFaqEPebfrHLYcC',
  issuerBaseURL: 'https://dev-a4848ehnu7a4o0ew.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
 
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