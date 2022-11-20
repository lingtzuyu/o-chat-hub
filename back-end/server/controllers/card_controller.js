require('dotenv').config();
const Card = require('../models/card_model');

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

// 儲存note到mongoDB
const saveMessagesToNote = async (req, res) => {
  // verifiedAuth內拿的
  const author = req.user.mail;
  const { category, messagesToBeSaved } = req.body;
  console.log('訊息info', messagesToBeSaved);

  try {
    const newNote = await Card.NoteDataMongo.create({
      NoteId: null, // TODO: 之後改
      NoteTime: new Date(),
      Category: category, //
      Author: author, // mail，從auth來
      FROM: null,
      Notes: null,
      Liked: false,
      Transferred: false,
      DELETED: false,
    });

    // 這邊需要await
    // 先確認messageId確實存在
    // const chatExist = await MessageDataMongo.findById(
    //   '637286504ad229c2424029ea'
    // );
    // console.log('chat存在', chatExist);
    await Promise.all(
      messagesToBeSaved.map((message) => {
        const initialNoteFinish = newNote.MessageRecords.push(
          message.messageId
        );
        return initialNoteFinish;
      })
    );

    await newNote.save();

    const noteInsertId = newNote._id.toString();
    console.log(noteInsertId);

    // 返回note編號
    res
      .status(200)
      .json({ systemInfo: 'save sucessful', noteId: noteInsertId });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Internal Error' });
  }
};

const fetchCardHistory = async (req, res) => {
  try {
    const { userMail } = req.body;
    const response = await Card.fetchCardHistoryByMail(userMail);
    console.log(response);
    res.status(200).send(response);
  } catch (err) {
    console.log('controller', err);
    res.status(500).send({ err: 'Internal Error' });
  }
};

module.exports = {
  fetchCardCategory,
  saveMessagesToNote,
  fetchCardHistory,
};
