const express = require('express');
const ApiHandler = require('./api');

function startInstance() {
  const app = express();
  const PORT = process.env.port || 5000;

  app.use('/api', ApiHandler);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))

}

startInstance();