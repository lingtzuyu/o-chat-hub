require('dotenv').config();
const mongoose = require('mongoose');
const { sqlDB } = require('./mysqlconn');

const { Schema } = mongoose;

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

// fetch card category
const fetchCardCategory = async () => {
  const presentFunctionName = 'fetchCardCategory';
  try {
    const cardCategoryQuery = 'SELECT * FROM cardcategory';
    const [result] = await sqlDB.query(cardCategoryQuery);
    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when fetching card category, msg: ${err}`,
      presentFunctionName,
    );
  }
};

// fetch all card history by category
const fetchCardHistoryByCategory = async (userId, category) => {
  const presentFunctionName = 'fetchCardHistoryByCategory';
  try {
    const personalCardQueryByCategory = await NoteDataMongo.find({
      AuthorId: userId,
      Category: category,
    })
      .sort({ NoteTime: -1 })
      .populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
    return personalCardQueryByCategory;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when fetching card hitory by category, msg: ${err}`,
      presentFunctionName,
    );
  }
};

// fetch all card history by current chat partner
const fetchCardHistoryByChatPartner = async (userId, fromId) => {
  const presentFunctionName = 'fetchCardHistoryByChatPartner';
  try {
    const chatPartnerCardQuery = await NoteDataMongo.find({
      AuthorId: userId,
      FromId: fromId,
    })
      .sort({ NoteTime: -1 })
      .populate({ path: 'MessageRecords', model: 'MessageDataMongo' });
    return chatPartnerCardQuery;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when fetching card hitory by chat partner, msg: ${err}`,
      presentFunctionName,
    );
  }
};

// update title and notes after save
const updateTitleAndNotes = async (cardId, title, notes, userId) => {
  const presentFunctionName = 'updateTitleAndNotes';
  try {
    const result = await NoteDataMongo.findOneAndUpdate(
      { AuthorId: userId, _id: cardId },
      {
        Notes: notes,
        Title: title,
      },
      // return the document after update
      { new: true },
    );
    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when updating card content, msg: ${err}, cardId:${cardId}`,
      presentFunctionName,
    );
  }
};

// update category
const updateCategory = async (cardId, category, userId) => {
  const presentFunctionName = 'updateCategory';
  try {
    const result = await NoteDataMongo.findOneAndUpdate(
      { AuthorId: userId, _id: cardId },
      {
        Category: category,
      },
      { new: true },
    );
    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error when updating card category, msg: ${err}, cardId:${cardId}`,
      presentFunctionName,
    );
  }
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
