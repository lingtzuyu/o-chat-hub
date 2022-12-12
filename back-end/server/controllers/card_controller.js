require('dotenv').config();
const Card = require('../models/card_model');
const Friend = require('../models/friend_model');
const MessageModel = require('../models/message_model');

// save card notes to mongoDB
const saveMessagesToNote = async (req, res) => {
  // take usermail verifiedAuth as author
  const author = req.user.mail;
  const { category, messagesToBeSaved, Title, Notes, From, FromId, FromMail } =
    req.body;

  const newNote = await Card.NoteDataMongo.create({
    NoteId: null, // TODO: 之後改
    NoteTime: new Date(),
    Category: category, //
    Author: author, // mail，從auth來
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

  const noteInsertId = newNote._id.toString();

  // 返回note編號
  return res
    .status(200)
    .json({ data: { systemInfo: 'save sucessful', noteId: noteInsertId } });
};

// check if card exist before any implementation
const checkCardExist = async (req, res, next) => {
  try {
    const author = req.user.mail;
    const { cardId } = req.body;
    const result = await Card.checkCardExist(cardId, author);
    console.log('是否有這張', result);
    // if (!result) {
    //   return res.status(400).send({ message: 'Card not exist' });
    // }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Card not exist' });
  }
  return next();
};

// like
const setLikeById = async (req, res) => {
  const { cardId } = req.body;
  await Card.setLikeById(cardId);
  res.status(200).send({ message: 'Like card' });
};

// dislike
const setDislikeById = async (req, res) => {
  try {
    const { cardId } = req.body;
    const result = await Card.setDislikeById(cardId);
    res.status(200).send({ message: 'Dislike card' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Internal Error' });
  }
};

// delete card by its id
const deleteCardById = async (req, res) => {
  try {
    const author = req.user.mail;
    console.log(author);
    const { cardId } = req.body;
    console.log(cardId);
    const result = await Card.deleteCardById(cardId, author);
    res.status(200).send({ message: 'Card deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Internal Error' });
  }
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

const fetchCardHistory = async (req, res) => {
  try {
    const { mail } = req.user;
    const response = await Card.fetchCardHistoryByMail(mail);
    // console.log(response);
    return res.status(200).send(response);
  } catch (err) {
    console.log('controller', err);
    return res.status(500).send({ err: 'Internal Error' });
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
  const { mail } = req.user;
  const category = req.params.category;
  const fromId = req.query.fromId;
  console.log(category);
  console.log(fromId);

  if (category === 'all') {
    const response = await Card.fetchCardHistoryByMail(mail);
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
