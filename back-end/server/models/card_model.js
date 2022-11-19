require('dotenv').config();
const { sqlDB } = require('./mysqlconn');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// note schema
const noteSchema = new Schema({
  NoteId: String, // userID補滿8位 + UNIX日期亂數
  NoteTime: Date, // contorller那生成unix間
  Author: String, // TODO:userID
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

const fetchCardCategory = async () => {
  const cardCategoryQuery = 'SELECT * FROM cardcategory';
  const [result] = await sqlDB.query(cardCategoryQuery);
  return result;
};

module.exports = {
  fetchCardCategory,
};
module.exports = mongoose.model('NoteDataMongo', noteSchema);
