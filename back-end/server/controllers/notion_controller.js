require('dotenv').config();
const Notion = require('../models/notion_model');
const Friend = require('../models/friend_model');
const { createTickets } = require('../../integration/notion/notion');

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

const exportToNotion = async (req, res) => {
  try {
    const { notionTitle, notionStatus, cardsToBeExporting } = req.body;
    console.log(cardsToBeExporting);
    await createTickets(
      notionTitle,
      // notionStatus,
      cardsToBeExporting.category,

      JSON.stringify(cardsToBeExporting.messageRecords)
    );
    res.status(200).send('Notion saved');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getNotionToken, exportToNotion };
