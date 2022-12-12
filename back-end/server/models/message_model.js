const mongoose = require('mongoose');

const { Schema } = mongoose;

const { MongoException } = require('../services/exceptions/mongo_exception');
const { Exception } = require('../services/exceptions/exception');

// https://www.mongodb.com/community/forums/t/advice-for-chat-schema-design/114166

const messageSchema = new Schema({
  sender: Number,
  senderMail: String,
  body: String,
  date: Date,
  type: String,
});

const MessageDataMongo = mongoose.model('MessageDataMongo', messageSchema);

// Buffering timed out after 10000ms
// https://masteringjs.io/tutorials/mongoose/buffering-timed-out-after-10000ms#:~:text=This%20error%20happens%20because%20you,created%20connection%20but%20using%20mongoose.

// check if id exist
const checkMessageExist = async (messageId) => {
  const presentFunctionName = 'checkMessageExist';
  try {
    const messageExist = await MessageDataMongo.findById(messageId);
    // message not exist will return null
    if (messageExist === null) {
      return { msg: 'Not exist' };
    }
    return { msg: 'Exist' };
  } catch (err) {
    // prevent postman directly post wrong data
    if (err.path.includes('_id')) {
      throw new MongoException(
        'The input messageId format is not correct',
        `${messageId} is not a correct MongoDB ObjectId`,
        'MessageDataMongo',
        'findById',
        presentFunctionName,
      );
    }

    // general error handling
    throw new Exception(
      'Internal error',
      `Unknow error when finding the message, message ObjectId: ${messageId}`,
      presentFunctionName,
    );
  }
};

module.exports = { MessageDataMongo, checkMessageExist };
