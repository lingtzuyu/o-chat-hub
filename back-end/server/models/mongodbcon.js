const mongoose = require('mongoose');
require('dotenv').config();
const MongoException = require('../services/exceptions/mongo_exception');

const mongoURI = process.env.MONGO_URI;

// TODO: 沒呼叫
const mongo = async () => {
  const presentFunctionName = 'monogo';
  try {
    mongoose.connect(mongoURI, () =>
      console.log('mongoDB connected by mongoose'),
    );
  } catch (error) {
    throw new MongoException(
      'Error happened when establishing connection',
      'Error happened when establishing connection',
      'monogodbcon.js',
      'mongo',
      presentFunctionName,
    );
  }
};

// mongo();

module.exports = { mongo };
