const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morganBody = require('morgan-body');

const app = express();

// ws是基於http協議之上
const http = require('http');

const server = http.createServer(app);

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// FIXME: cors裡面的設定，前後端分離不要全開
app.use(cors());
morganBody(app);

// 環境變數
const { SERVER_PORT, API_VERSION } = process.env;

// socket
const Socket = require('./socket');

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

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// WS server 建立
Socket.initialSocketServer(server);

server.listen(SERVER_PORT, () => {
  // TODO: remove after production published
  console.log(`Server is running on ${SERVER_PORT}`);
});
