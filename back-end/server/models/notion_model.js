require('dotenv').config();
const axios = require('axios');
const { sqlDB } = require('./mysqlconn');

// 存入針對某notion頁面(db)的accessToken以及關連到的頁面(db) id

const saveNotionTokenAndPageId = async (code, userId) => {
  // 帶著code去加上webApp的驗證資料取得notion accessToken

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.notion.com/v1/oauth/token',
      auth: {
        username: process.env.NOTION_CLIENT_ID,
        password: process.env.NOTION_CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/json' },
      data: { code, grant_type: 'authorization_code' },
    });

    const accessToken = response.data.access_token;
    console.log(' 這是token', response.data.access_token);

    // 帶著accessToken取拉出此accessToken被授權存取的DB

    const { data } = await axios({
      method: 'POST',
      url: 'https://api.notion.com/v1/search',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-02-22',
      },
      data: { filter: { property: 'object', value: 'database' } },
    });

    const notionDatabaseid = data?.results[0].id;
    console.log('後端DB ID', notionDatabaseid);

    // 存入SQL DB
    const insertNotionTokenQuery =
      'INSERT INTO notionaccess SET user_id = ?, notionAccessToken =?, relatedNotionPageId = ?';
    const [result] = await sqlDB.query(insertNotionTokenQuery, [
      userId,
      accessToken,
      notionDatabaseid,
    ]);

    // // 返回DB id, accessToken給前端
    return result;
  } catch (err) {
    console.log('notion API error', err);
  }
};

module.exports = { saveNotionTokenAndPageId };
