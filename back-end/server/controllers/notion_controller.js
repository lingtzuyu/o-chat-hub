require('dotenv').config();
const Notion = require('../models/notion_model');
const Friend = require('../models/friend_model');

const getNotionToken = async (req, res) => {
  const { code } = req.params;
  // const { mail } = req.user;

  try {
    // const userId = await Friend.checkUserExist(mail);
    const result = Notion.saveNotionTokenAndPageId(code);
    const notionIntegrationInfo = {
      notionAccessToken: result.accessToken,
      notionIntegratedDB: result.authorizedDBid,
    };
    res.status(200).send(notionIntegrationInfo);
  } catch (err) {
    return res.status(500).send('Internal Error');
  }
};

module.exports = { getNotionToken };
