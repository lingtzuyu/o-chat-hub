require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const morganBody = require('morgan-body');
const {
  MongoException,
} = require('./server/services/exceptions/mongo_exception');
const { SQLException } = require('./server/services/exceptions/sql_exception');
const { APIException } = require('./server/services/exceptions/api_exception');
const { Exception } = require('./server/services/exceptions/exception');

// socket
const Socket = require('./socket');

const app = express();
const httpServer = http.createServer(app);

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

morganBody(app);

// 環境變數
const { SERVER_PORT, API_VERSION } = process.env;

const { mongo } = require('./server/models/mongodbcon');

mongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(`/api/${API_VERSION}`, [
  require('./server/routes/auth_route'),
  require('./server/routes/friend_route'),
  require('./server/routes/card_route'),
  require('./server/routes/notion_route'),
]);

app.use((err, req, res, next) => {
  console.log('General Error msg', err.fullLog);
  if (err instanceof MongoException) {
    console.log('Mongo msg', err.message);
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof SQLException) {
    console.log('SQL msg', err.message);
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof APIException) {
    console.log('API msg', err.message);
    return res.status(err.status).json({ msg: err.message });
  }
  if (err instanceof Exception) {
    console.log('Exception', err.message);
    return res.status(500).json({ msg: err.message });
  }
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// WS server 建立
Socket.initialSocketServer(httpServer);

httpServer.listen(SERVER_PORT, () => {
  // TODO: remove after production published
  console.log(`Server is running on ${SERVER_PORT}`);
});

module.exports = { httpServer, app };
