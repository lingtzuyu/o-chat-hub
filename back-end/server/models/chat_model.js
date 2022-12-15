const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: [
    {
      type: Number,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MessageDataMongo',
    },
  ],
});

const ChatDataMongo = mongoose.model('ChatDataMongo', chatSchema);

module.exports = { ChatDataMongo };
