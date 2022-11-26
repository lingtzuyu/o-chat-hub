require('dotenv').config();
const axios = require('axios');
const { sqlDB } = require('./mysqlconn');
const { Client } = require('@notionhq/client');

// notion token check，是否SQL內已經有accessToken
const notionTokenCheck = async (userId) => {
  const notionTokenCheckQuery = 'SELECT * FROM notionaccess WHERE user_id = ?';
  const [result] = await sqlDB.query(notionTokenCheckQuery, [userId]);
  return result;
};

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
    console.log(data);
    const notionDatabaseid = data?.results[0]?.id;
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

// 存入notion資料
const createPageInNotion = async (
  notionAccessToken,
  relatedNotionPageId,
  title,
  category,
  status,
  priority,
  from,
  messages,
  notes,
  todoArray
) => {
  // 建立notion連線
  const notion = new Client({
    //fetch from db later
    auth: notionAccessToken,
  });

  const response = notion.pages.create({
    parent: {
      // 指定哪個db id要創建
      type: 'database_id',
      database_id: relatedNotionPageId,
    },
    properties: {
      // page的標題
      title: [
        {
          type: 'text',
          text: {
            content: title,
          },
        },
      ],
      // category
      '%7CX_j': { name: category },
      // status
      '3E6J': { name: status },
      // from (sender)
      'VHx%7B': [
        {
          type: 'text',
          text: {
            content: from,
          },
        },
      ],

      // 優先 Low, Medium, High
      "'Hr%40": { name: priority },

      // due date，格式待確認
      // 'z.OF': [
      //   {
      //     date: { start: null, end: '2022-12-22' },
      //   },
      // ],
    },
    children: [
      {
        object: 'block',
        heading_1: {
          rich_text: [
            {
              text: {
                content: 'Messages',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        paragraph: {
          rich_text: [
            {
              text: {
                content: messages,
                link: { url: 'www.take-notes.chat' },
              },
            },
          ],
        },
      },
      {
        object: 'block',
        heading_1: {
          rich_text: [
            {
              text: {
                content: 'Notes',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        paragraph: {
          rich_text: [
            {
              text: {
                content: notes,
              },
            },
          ],
        },
      },
      {
        object: 'block',
        heading_1: {
          rich_text: [
            {
              text: {
                content: 'TO-DO List',
              },
            },
          ],
        },
      },

      // 這邊可以用server side來打包
      {
        object: 'block',
        to_do: {
          rich_text: [
            {
              text: {
                content: todoArray,
              },
            },
          ],
        },
      },
    ],
  });
  // 拿到該頁連結
  return response;
};

module.exports = {
  saveNotionTokenAndPageId,
  notionTokenCheck,
  createPageInNotion,
};
