require('dotenv').config();
const Notion = require('../models/notion_model');
const Friend = require('../models/friend_model');

const getNotionToken = async (req, res) => {
  const { code } = req.params;
  const { mail } = req.user;
  // console.log(req.headers.authorization);
  try {
    const userIdCheck = await Friend.checkUserExist(mail);
    const userId = userIdCheck[0].id;
    const result = await Notion.saveNotionTokenAndPageId(code, userId);
    const notionIntegrationInfo = {
      result: 'notion linked',
      userId,
    };
    res.status(200).send(notionIntegrationInfo);
  } catch (err) {
    return res.status(500).send('Internal Error');
  }
};

module.exports = { getNotionToken };
