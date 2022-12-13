require('dotenv').config();
const mongoose = require('mongoose');
const { sqlDB } = require('./mysqlconn');

const { Schema } = mongoose;

const { MongoException } = require('../services/exceptions/mongo_exception');
const { Exception } = require('../services/exceptions/exception');

// note schema
const noteSchema = new Schema({
  NoteId: String,
  NoteTime: Date,
  Author: String,
  AuthorId: Number,
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

// fetch personal card history, recent first
const fetchCardHistoryById = async (authorId) => {
  const presentFunctionName = 'fetchCardHistoryById';
  try {
    const personalCardQuery = await NoteDataMongo.find({
      AuthorId: authorId,
    })
      .populate({ path: 'MessageRecords', model: 'MessageDataMongo' })
      .sort({ NoteTime: -1 });

    return personalCardQuery;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when fetching card history for userId: ${authorId}`,
      presentFunctionName,
    );
  }
};

// check if card exist
const checkCardExist = async (cardId, authorId) => {
  const presentFunctionName = 'checkCardExist';
  try {
    const result = await NoteDataMongo.findOne({
      _id: cardId,
      AuthorId: authorId,
    });

    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when checking cardId exists: ${cardId}`,
      presentFunctionName,
    );
  }
};

// set like (read)
const setLikeById = async (cardId) => {
  const presentFunctionName = 'setLikeById';
  try {
    const likeCard = await NoteDataMongo.findByIdAndUpdate(cardId, {
      Liked: true,
    });

    return likeCard;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error set like(read) on card: ${cardId}`,
      presentFunctionName,
    );
  }
};
// set dislike (unread)
const setDislikeById = async (cardId) => {
  const presentFunctionName = 'setDislikeById';
  try {
    const dislikeCard = await NoteDataMongo.findByIdAndUpdate(cardId, {
      Liked: false,
    });

    return dislikeCard;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error set like(read) on card: ${cardId}`,
      presentFunctionName,
    );
  }
};

// delete card by Id
const deleteCardById = async (cardId, authorId) => {
  const presentFunctionName = 'deleteCardById';
  try {
    const deleteCardQuery = await NoteDataMongo.deleteOne({
      _id: cardId,
      AuthorId: authorId,
    });

    return deleteCardQuery;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when delete on card: ${cardId}`,
      presentFunctionName,
    );
  }
};

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

const fetchCardHistoryByCategory = async (userMail, category) => {
  const personalCardQueryByCategory = await NoteDataMongo.find({
    Author: userMail,
    Category: category,
  })
    .sort({ NoteTime: -1 })
    .populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
  return personalCardQueryByCategory;
};

const fetchCardHistoryByChatPartner = async (userMail, fromId) => {
  console.log(fromId);
  const chatPartnerCardQuery = await NoteDataMongo.find({
    Author: userMail,
    FromId: fromId,
  })
    .sort({ NoteTime: -1 })
    .populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
  return chatPartnerCardQuery;
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
      { new: true },
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

// update category
const updateCategory = async (cardId, category, mail) => {
  try {
    const result = await NoteDataMongo.findOneAndUpdate(
      { Author: mail, _id: cardId },
      {
        Category: category,
      },
      { new: true },
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchCardHistoryById,
  fetchCardCategory,
  NoteDataMongo,
  deleteCardById,
  setLikeById,
  setDislikeById,
  checkCardExist,
  updateLinkToNote,
  fetchCardHistoryByCategory,
  updateTitleAndNotes,
  updateCategory,
  fetchCardHistoryByChatPartner,
};
// module.exports = mongoose.model('NoteDataMongo', noteSchema);
