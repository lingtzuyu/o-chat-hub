const CardModel = require('../models/card_model');
const MessageModel = require('../models/message_model');

// save card notes to mongoDB
const saveMessagesToNote = async (req, res) => {
  // take usermail verifiedAuth as author
  const author = req.user.mail;
  const {
    category,
    messagesToBeSaved,
    Title,
    Notes,
    From,
    FromId,
    FromMail,
    AuthorId,
  } = req.body;

  const newNote = await CardModel.NoteDataMongo.create({
    NoteId: null,
    NoteTime: new Date(),
    Category: category,
    Author: author,
    AuthorId,
    Title,
    FROM: From,
    FromId,
    FromMail,
    Notes,
    Liked: false,
    Transferred: false,
    DELETED: false,
  });

  await Promise.all(
    messagesToBeSaved.map(async (message) => {
      const exist = await MessageModel.checkMessageExist(message.messageId);
      if (exist.msg === 'Not exist') {
        return;
      }

      newNote.MessageRecords.push(message.messageId);
    }),
  );

  await newNote.save();

  const noteInsertId = newNote.id.toString();

  // 返回note編號
  return res
    .status(200)
    .json({ data: { systemInfo: 'save sucessful', noteId: noteInsertId } });
};

// fetch card history (all)
const fetchCardHistory = async (req, res) => {
  const { userId } = req.user;
  const response = await CardModel.fetchCardHistoryById(userId);

  return res.status(200).send(response);
};

// check if card exist before any implementation on card
const checkCardExist = async (req, res, next) => {
  const authorId = req.user.userId;
  const { cardId } = req.body;
  const result = await CardModel.checkCardExist(cardId, authorId);
  // already pass veriedAuth middleware if reach here
  if (result === null) {
    return res.status(400).send({ msg: 'no this card' });
  }

  return next();
};

// like
const setLikeById = async (req, res) => {
  const { cardId } = req.body;
  await CardModel.setLikeById(cardId);
  res.status(200).send({ msg: 'Like card (read)' });
};

// dislike
const setDislikeById = async (req, res) => {
  const { cardId } = req.body;
  await CardModel.setDislikeById(cardId);
  res.status(200).send({ msg: 'Dislike card (unread)' });
};

// delete card by its id
const deleteCardById = async (req, res) => {
  const authorId = req.user.userId;
  const { cardId } = req.body;
  await CardModel.deleteCardById(cardId, authorId);
  res.status(200).send({ msg: 'Card deleted!' });
};

// return category name
const fetchCardCategory = async (req, res) => {
  const result = await CardModel.fetchCardCategory();
  const categories = result.map((e) => e.categoryname);
  res.status(200).send(categories);
};

// fetch card history by author and category
const fetchCardDetailsByCategory = async (req, res) => {
  const { userId } = req.user;
  const { category } = req.params;
  const { fromId } = req.query;

  if (category === 'all' || !category) {
    const response = await CardModel.fetchCardHistoryById(userId);
    return res.status(200).send(response);
  }

  if (category === 'fromCurrent') {
    const response = await CardModel.fetchCardHistoryByChatPartner(
      userId,
      fromId,
    );
    return res.status(200).send(response);
  }

  // depending on category from params
  const response = await CardModel.fetchCardHistoryByCategory(userId, category);
  return res.status(200).send(response);
};

// update notes or title for existing card
const updateCardTitleAndNotes = async (req, res) => {
  // 用auth來的mail驗證card author
  const { userId } = req.user;
  const { cardId, title, notes } = req.body;

  await CardModel.updateTitleAndNotes(cardId, title, notes, userId);

  return res.status(200).send({ msg: 'update success' });
};

const updateCategory = async (req, res) => {
  const { userId } = req.user;
  const { cardId, category } = req.body;
  await CardModel.updateCategory(cardId, category, userId);

  return res.status(200).send({ msg: 'update success' });
};

module.exports = {
  fetchCardCategory,
  saveMessagesToNote,
  fetchCardHistory,
  deleteCardById,
  checkCardExist,
  setLikeById,
  setDislikeById,
  fetchCardDetailsByCategory,
  updateCardTitleAndNotes,
  updateCategory,
};
