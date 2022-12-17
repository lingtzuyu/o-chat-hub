const NotionModel = require('../models/notion_model');
const NotionService = require('../services/notion_service');

const Card = require('../models/card_model');

const checkNotionToken = async (req, res, next) => {
  const { userId } = req.user;

  const result = await NotionModel.checkNotionTokenExist(userId);

  req.notion = result[0];

  // if already have token
  if (result[0] !== undefined) {
    return res.status(400).send('You have already linked to Notion');
  }

  return next();
};

const getNotionToken = async (req, res) => {
  const { code } = req.body;
  const { userId } = req.user;

  const response = await NotionService.issueNotionRequest(code);

  // save to db
  await NotionModel.saveNotionTokenAndDBid(
    userId,
    response.notionToken,
    response.notionDBid,
    response.notionLink,
  );

  const notionIntegrationInfo = {
    result: 'notion linked',
    userId,
    data: {
      notionDBLink: response.notionLink,
      notionDBId: response.notionDBid,
    },
  };
  return res.status(200).send(notionIntegrationInfo);
};

const removeNotionToken = async (req, res) => {
  const { userId } = req.user;

  const result = await NotionModel.removeNotionConnect(userId);
  const { removedDBId } = result;

  return res.status(200).send({ result: 'remove successfully', removedDBId });
};

const recoverNotionToken = async (req, res) => {
  const { userId } = req.user;

  const result = await NotionModel.recoverNotionConnect(userId);
  const { recoveredDBId } = result;

  return res
    .status(200)
    .send({ result: 'recover successfully', recoveredDBId });
};

const checkNotionTokenWhenExporting = async (req, res, next) => {
  const { userId } = req.user;

  const result = await NotionModel.checkNotionTokenExist(userId);

  req.notion = result[0];

  if (result[0] === undefined) {
    return res
      .status(400)
      .json({ msg: 'Please go to profile page to link notion first' });
  }

  return next();
};

const exportToNotion = async (req, res) => {
  const { title, category, status, priority, from, messages, notes, cardId } =
    req.body;
  const { notionAccessToken, relatedNotionPageId } = req.notion;

  const notionPageLink = await NotionService.createNotionPage(
    notionAccessToken,
    relatedNotionPageId,
    title,
    category,
    status,
    priority,
    from,
    messages,
    notes,
  );

  // save notionLink to mongoDB
  const result = await Card.updateLinkToNote(cardId, notionPageLink.url);
  if (!result) {
    return res.status(400).send('Please check if the export format correct');
  }
  return res
    .status(200)
    .json({ msg: 'Export to Notion successfully', link: result });
};

// clear notion token and notion link forever
const clearNotionLink = async (req, res) => {
  const { userId } = req.user;
  const result = await NotionService.clearNotionTokenLogic(userId);
  console.log('result', result);
  return res.status(200).json({ msg: 'Notion db link totally removed' });
};

module.exports = {
  getNotionToken,
  exportToNotion,
  checkNotionToken,
  checkNotionTokenWhenExporting,
  removeNotionToken,
  recoverNotionToken,
  clearNotionLink,
};
