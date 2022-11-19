require('dotenv').config();
const Card = require('../models/card_model');

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

module.exports = {
  fetchCardCategory,
};
