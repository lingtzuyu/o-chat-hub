require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const morganBody = require('morgan-body');
const { SQLException } = require('./server/services/exceptions/sql_exception');
const { APIExcption } = require('./server/services/exceptions/api_exception');
const { Exception } = require('./server/services/exceptions/exception');

// socket
const Socket = require('./socket');

const app = express();
const httpServer = http.createServer(app);

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// FIXME: cors裡面的設定，前後端分離不要全開
app.use(cors());

// FIXME: 之後再開啟
// morganBody(app);

// 環境變數
const { SERVER_PORT, API_VERSION } = process.env;

// DB connection
// https://stackoverflow.com/questions/23293202/export-and-reuse-my-mongoose-connection-across-multiple-models

const { mongo } = require('./server/models/mongodbcon');

mongo();
// FIXME: 刪除，放在mongo連線那邊

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(`/api/${API_VERSION}`, [
  require('./server/routes/auth_route'),
  require('./server/routes/friend_route'),
  require('./server/routes/card_route'),
  require('./server/routes/notion_route'),
]);

// TODO: 404

app.use((err, req, res, next) => {
  console.log('最外層', err.fullLog);
  if (err instanceof SQLException) {
    console.log('SQL msg', err.message);
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof APIExcption) {
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
