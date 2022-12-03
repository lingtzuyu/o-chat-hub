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
  ExportLink: String,
  ExportTo: String,
});

const NoteDataMongo = mongoose.model('NoteDataMongo', noteSchema);

const fetchCardCategory = async () => {
  const cardCategoryQuery = 'SELECT * FROM cardcategory';
  const [result] = await sqlDB.query(cardCategoryQuery);
  return result;
};

// 上方快捷用，不用滾出messages
// const fetchLastFiveCardHistoryByMail = async (userMail) => {
//   const lastFiveCardQuery = await NoteDataMongo.find({
//     Authour: userMail,
//   })
//     .sort({ NoteTime: -1 })
//     .limit(5);
//   return lastFiveCardQuery;
// };

const fetchCardHistoryByMail = async (userMail) => {
  const personalCardQuery = await NoteDataMongo.find({
    Author: userMail,
  })
    .populate({ path: 'MessageRecords', model: 'MessageDataMongo' })
    .sort({ NoteTime: -1 });

  return personalCardQuery;
};

const fetchCardHistoryByCategory = async (userMail, category) => {
  const personalCardQueryByCategory = await NoteDataMongo.find({
    Author: userMail,
    Category: category,
  })
    .sort({ NoteTime: -1 })
    .populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
  return personalCardQueryByCategory;
};

// check if card exist
const checkCardExist = async (cardId, userMail) => {
  const result = await NoteDataMongo.findOne({
    _id: cardId,
    Author: userMail,
  });
  return result;
};

// set like
const setLikeById = async (cardId) => {
  const likeCard = await NoteDataMongo.findByIdAndUpdate(cardId, {
    Liked: true,
  });

  return likeCard;
};
// set dislike
const setDislikeById = async (cardId) => {
  const dislikeCard = await NoteDataMongo.findByIdAndUpdate(cardId, {
    Liked: false,
  });

  return dislikeCard;
};

// author確認 (前方token傳回來)才能刪除，不然報錯
const deleteCardById = async (cardId, userMail) => {
  const deleteCardQuery = await NoteDataMongo.deleteOne({
    _id: cardId,
    Author: userMail,
  });

  return deleteCardQuery;
};

// update notion link to mongoDB
const updateLinkToNote = async (cardId, notionLink) => {
  try {
    const result = await NoteDataMongo.findByIdAndUpdate(cardId, {
      Transferred: true,
      ExportLink: notionLink,
      ExportTo: 'notion',
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// update title and notes after save
const updateTitleAndNotes = async (cardId, title, notes, mail) => {
  try {
    const result = await NoteDataMongo.findOneAndUpdate(
      { Author: mail, _id: cardId },
      {
        Notes: notes,
        Title: title,
      },
      { new: true }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchCardHistoryByMail,
  fetchCardCategory,
  NoteDataMongo,
  deleteCardById,
  setLikeById,
  setDislikeById,
  checkCardExist,
  updateLinkToNote,
  fetchCardHistoryByCategory,
  updateTitleAndNotes,
};
// module.exports = mongoose.model('NoteDataMongo', noteSchema);
