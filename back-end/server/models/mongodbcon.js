const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

// TODO: 沒呼叫
const mongo = async () => {
  try {
    mongoose.connect(mongoURI, () =>
      console.log('mongoDB connected by mongoose')
    );
  } catch (error) {
    console.error('mongoDB error', error);
  }
};

// mongo();

module.exports = { mongo };
