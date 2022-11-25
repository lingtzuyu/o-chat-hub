require('dotenv').config();
const mongoose = require('mongoose');
const { sqlDB } = require('./mysqlconn');

const { Schema } = mongoose;

// note schema
const noteSchema = new Schema({
  NoteId: String, // userID補滿8位 + UNIX日期亂數
  NoteTime: Date, // contorller那生成unix間
  Author: String, // TODO:userID
  FROM: String,
  FromId: Number,
  FromMail: String,
  Tags: [],
  Title: String,
  Category: String,
  MessageRecords: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MessageDataMongo',
    },
  ],
  Notes: String,
  Liked: Boolean,
  Transferred: Boolean,
  DELETED: Boolean,
});

const NoteDataMongo = mongoose.model('NoteDataMongo', noteSchema);

const fetchCardCategory = async () => {
  const cardCategoryQuery = 'SELECT * FROM cardcategory';
  const [result] = await sqlDB.query(cardCategoryQuery);
  return result;
};

const fetchCardHistoryByMail = async (userMail) => {
  const personalCardQuery = await NoteDataMongo.find({
    Author: userMail,
  }).populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
  return personalCardQuery;
};

// author確認 (前方token傳回來)才能刪除，不然報錯
const deleteCardById = async (cardId, userMail) => {
  const deleteCardQuery = await NoteDataMongo.deleteOne({
    _id: cardId,
    Author: userMail,
  });
  console.log('card deleted by CardId');
  return deleteCardQuery;
};

module.exports = {
  fetchCardHistoryByMail,
  fetchCardCategory,
  NoteDataMongo,
  deleteCardById,
};
// module.exports = mongoose.model('NoteDataMongo', noteSchema);
