require('dotenv').config();
const Card = require('../models/card_model');
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

  const newNote = await Card.NoteDataMongo.create({
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
  const response = await Card.fetchCardHistoryById(userId);

  return res.status(200).send(response);
};

// check if card exist before any implementation on card
const checkCardExist = async (req, res, next) => {
  const authorId = req.user.userId;
  const { cardId } = req.body;
  const result = await Card.checkCardExist(cardId, authorId);
  // already pass veriedAuth middleware if reach here
  if (result === null) {
    return res.status(400).send({ msg: 'no this card' });
  }

  return next();
};

// like
const setLikeById = async (req, res) => {
  const { cardId } = req.body;
  await Card.setLikeById(cardId);
  res.status(200).send({ msg: 'Like card (read)' });
};

// dislike
const setDislikeById = async (req, res) => {
  const { cardId } = req.body;
  await Card.setDislikeById(cardId);
  res.status(200).send({ msg: 'Dislike card (unread)' });
};

// delete card by its id
const deleteCardById = async (req, res) => {
  const authorId = req.user.userId;
  const { cardId } = req.body;
  await Card.deleteCardById(cardId, authorId);
  res.status(200).send({ msg: 'Card deleted!' });
};

// 返回categoryname資料庫的category array
const fetchCardCategory = async (req, res) => {
  try {
    const result = await Card.fetchCardCategory();
    const categories = result.map((e) => e.categoryname);
    res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Internal Error' });
  }
};

// fetch last 5 card for notifiation
// const fetchLastFiveCards = async (req, res) => {
//   const { mail } = req.user;
//   const response = await Card.fetchLastFiveCardHistoryByMail(mail);
//   return res.status(200).send(response);
// };

// fetch card history by Mail and category
const fetchCardDetailsByCategory = async (req, res) => {
  // auth過來的
  const { mail, userId } = req.user;
  const category = req.params.category;
  const fromId = req.query.fromId;
  console.log(category);
  console.log(fromId);

  if (category === 'all') {
    const response = await Card.fetchCardHistoryById(userId);
    return res.status(200).send(response);
  }

  if (category === 'fromCurrent') {
    // 打model取得 (用FromId或是FromMail)
    const response = await Card.fetchCardHistoryByChatPartner(mail, fromId);
    return res.status(200).send(response);
  }

  const response = await Card.fetchCardHistoryByCategory(mail, category);
  res.status(200).send(response);
};

const updateCardTitleAndNotes = async (req, res) => {
  // 用auth來的mail驗證card author
  const { mail } = req.user;
  const { cardId, title, notes } = req.body;
  const response = await Card.updateTitleAndNotes(cardId, title, notes, mail);
  console.log(response);
  if (response) {
    return res.status(200).send({ result: 'update success' });
  }
  return res.status(500).send({ result: 'update fail' });
};

const updateCategory = async (req, res) => {
  const { mail } = req.user;
  const { cardId, category } = req.body;
  const response = await Card.updateCategory(cardId, category, mail);
  console.log(response);
  if (response) {
    return res.status(200).send({ result: 'update success' });
  }
  return res.status(500).send({ result: 'update fail' });
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
