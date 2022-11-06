const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morganBody = require('morgan-body');

const { SERVER_PORT, API_VERSION } = process.env;

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
morganBody(app);

// API routes
app.use(`/api/${API_VERSION}`, [require('./server/routes/auth_Route')]);

app.listen(SERVER_PORT, () => {
  // TODO: remove after production published
  console.log(`Server is running on ${SERVER_PORT}`);
});
