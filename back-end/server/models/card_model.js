require('dotenv').config();
const { sqlDB } = require('./mysqlconn');

const fetchCardCategory = async () => {
  const cardCategoryQuery = 'SELECT * FROM cardcategory';
  const [result] = await sqlDB.query(cardCategoryQuery);
  return result;
};

module.exports = {
  fetchCardCategory,
};
