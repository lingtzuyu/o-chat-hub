const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morganBody = require('morgan-body');

const app = express();

const http = require('http');

const server = http.createServer(app);

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
morganBody(app);

// 環境變數
const { SERVER_PORT, API_VERSION } = process.env;

const Socket = require('./socket');

// initial socket io server
Socket.initialSocketServer(server);

// API routes
app.use(`/api/${API_VERSION}`, [
  require('./server/routes/auth_Route'),
  require('./server/routes/trello_Route'),
]);

server.listen(SERVER_PORT, () => {
  // TODO: remove after production published
  console.log(`Server is running on ${SERVER_PORT}`);
});
