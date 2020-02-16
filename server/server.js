const express = require('express');
var path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const ApiHandler = require('./api');
var bodyParser = require('body-parser')
console.log(  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN)
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function startInstance() {
  const app = express();

  app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));

  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 3000
  }));

  app.use('/static', express.static(path.join(__dirname, '../build/static')));
  app.use(express.static(path.join(__dirname, '../build')));

  const PORT = process.env.port || process.env.PORT || 5000;

  app.use('/api', ApiHandler);

  app.post('/api/messages', (req, res) => {
    console.log("gets to here in app.post");
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({success: true}));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({success: false}));
      });
  });

  //for everything else, return the HTML from the built client.
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))

}

startInstance();