require('dotenv').config();
const Card = require('../models/card_model');
const NoteDataMongo = require('../models/card_model');
const MessageDataMongo = require('../models/message_model');

// 返回categoryname資料庫的category array
const fetchCardCategory = async (req, res) => {
  try {
    const result = await Card.fetchCardCategory();
    const categories = result.map((e) => e.categoryname);
    res.status(200).send(categories);
  } catch (err) {
    res.status.send({ err: 'Internal Error' });
  }
};

// 儲存note到mongoDB
const saveMessagesToNote = async (req, res) => {
  // verifiedAuth內拿的
  const author = req.user.mail;
  const messageCollection = req.body;
  console.log(messageCollection);

  try {
    const newNote = await NoteDataMongo.create({
      NoteId: null, // TODO: 之後改
      NoteTime: new Date(),
      Author: author,
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
      messageCollection.map((message) => {
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
    res.status(200).json({ noteId: noteInsertId });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Internal Error' });
  }
};

module.exports = {
  fetchCardCategory,
  saveMessagesToNote,
};
