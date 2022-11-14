const mongoose = require('mongoose');

const { Schema } = mongoose;

// https://www.mongodb.com/community/forums/t/advice-for-chat-schema-design/114166

const messageSchema = new Schema({
  sender: Number,
  body: String,
  date: Date,
  type: String,
});

// Buffering timed out after 10000ms
// https://masteringjs.io/tutorials/mongoose/buffering-timed-out-after-10000ms#:~:text=This%20error%20happens%20because%20you,created%20connection%20but%20using%20mongoose.

module.exports = mongoose.model('MessageDataMongo', messageSchema);
