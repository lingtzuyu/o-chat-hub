const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const mongo = async () => {
  try {
    await mongoose.connect(mongoURI, () =>
      console.log('mongoDB connected by mongoose')
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { mongo };
