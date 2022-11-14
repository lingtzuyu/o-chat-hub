const mongoose = require('mongoose');

const { Schema } = mongoose;

// https://mongoosejs.com/docs/guide.html
// https://www.mongodb.com/community/forums/t/advice-for-chat-schema-design/114166

// https://vanessa7591.medium.com/%E7%AD%86%E8%A8%98-populat%E8%88%87-mongodb%E7%9A%84%E8%B3%87%E6%96%99%E9%97%9C%E8%81%AF-ffc619137910

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

module.exports = mongoose.model('ChatDataMongo', chatSchema);
