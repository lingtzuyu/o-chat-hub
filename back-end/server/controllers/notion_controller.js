require('dotenv').config();
const Notion = require('../models/notion_model');
const Friend = require('../models/friend_model');
const Card = require('../models/card_model');

const recoverNotionToken = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await Notion.recoverNotionConnect(userId);
    const { recoveredDBId } = result;
    console.log(result);
    if (result.status === 'sucess Recovered') {
      res.status(200).send({ result: 'recover successfully', recoveredDBId });
    } else {
      return res.status(500).send('Interanl Error');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Error');
  }
};

const removeNotionToken = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const result = await Notion.removeNotionConnect(userId);
    const removedDBId = result.removedDB;
    if (result.status === 'sucess Removed') {
      res.status(200).send({ result: 'remove successfully', removedDBId });
    } else {
      return res.status(500).send('Interanl Error');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Error');
  }
};

const getNotionToken = async (req, res) => {
  const { code } = req.body;
  // 從validation middleware來得資料
  const { mail } = req.user;
  try {
    const userIdCheck = await Friend.checkUserExist(mail);
    const userId = userIdCheck[0].id;
    const result = await Notion.saveNotionTokenAndPageId(code, userId);
    // 這邊result會回相關DB資料
    console.log('這邊來拿', result);
    const notionIntegrationInfo = {
      result: 'notion linked',
      userId,
      notionDBLink: result.url,
      notionDBId: result.id,
    };
    res.status(200).send(notionIntegrationInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Error');
  }
};

const checkNotionToken = async (req, res, next) => {
  // 解出jwt token內的mail
  const { mail } = req.user;
  // check user id
  const response = await Friend.checkUserExist(mail);
  const userId = response[0].id;
  console.log(userId);
  // 用model取出sql內的notion token以及DB id
  const result = await Notion.notionTokenCheck(userId);
  console.log('這邊', result);
  // result.notionAccessToken 以及result.relatedNotionPageId
  req.notion = result[0];
  console.log('middleware', req.notion);

  // 已經有 token，所以會回傳東西 => 不會是undefined
  if (result[0] !== undefined) {
    return res.status(400).send('You have already linked to Notion');
  }

  return next();
};

const checkNotionTokenWhenExporting = async (req, res, next) => {
  // 解出jwt token內的mail
  const { mail } = req.user;
  // check user id
  const response = await Friend.checkUserExist(mail);
  const userId = response[0].id;
  console.log(userId);
  // 用model取出sql內的notion token以及DB id
  const result = await Notion.notionTokenCheck(userId);
  console.log('這邊', result);
  // result.notionAccessToken 以及result.relatedNotionPageId
  req.notion = result[0];
  console.log('middleware', req.notion);

  if (result[0] === undefined) {
    return res
      .status(400)
      .send('Please go to profile page to link notion first');
  }

  return next();
};

const exportToNotion = async (req, res) => {
  const { title, category, status, priority, from, messages, notes, cardId } =
    req.body;
  const { notionAccessToken, relatedNotionPageId } = req.notion;
  console.log('下一個controller', relatedNotionPageId);

  try {
    const notionPageLink = await Notion.createPageInNotion(
      notionAccessToken,
      relatedNotionPageId,
      title,
      category,
      status,
      priority,
      from,
      messages,
      notes
    );

    console.log('notion response', notionPageLink.url);
    console.log('終止');

    // save notionLink to mongoDB
    const result = await Card.updateLinkToNote(cardId, notionPageLink.url);
    console.log('這邊有啥', result);
    if (!result) {
      return res.status(400).send('Please check if the export format correct');
    }
    res
      .status(200)
      .json({ msg: 'Export to Notion successfully', link: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Error, please check connection');
  }
};

module.exports = {
  getNotionToken,
  exportToNotion,
  checkNotionToken,
  checkNotionTokenWhenExporting,
  removeNotionToken,
  recoverNotionToken,
};
