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

// recover
const recoverNotionConnect = async (userId) => {
  const conn = await sqlDB.getConnection();
  try {
    await conn.query('START TRANSACTION');
    const changeUserNotionStatusQuery =
      'UPDATE user SET notionConnect = ? WHERE id = ?';
    await conn.query(changeUserNotionStatusQuery, [1, userId]);
    const removeNotionAccessQuery =
      'UPDATE notionaccess SET isRemoved = ? WHERE user_id = ?';
    await conn.query(removeNotionAccessQuery, [0, userId]);

    const recoveredDBIdQuery =
      'SELECT relatedNotionPageId FROM notionaccess WHERE user_id = ?';
    const recoveredResult = await conn.query(recoveredDBIdQuery, [userId]);
    const recoveredDBId = recoveredResult[0][0].relatedNotionPageId;

    await conn.query('COMMIT');
    return { status: 'sucess Recovered', recoveredDBId };
  } catch (err) {
    console.log(err);
    await conn.query('ROLLBACK');
  } finally {
    await conn.release();
  }
};

// 刪除notion連線 (user那邊狀態改為0，notionAccess isRemoved改為1)
const removeNotionConnect = async (userId) => {
  const conn = await sqlDB.getConnection();
  try {
    await conn.query('START TRANSACTION');
    const changeUserNotionStatusQuery =
      'UPDATE user SET notionConnect = 0 WHERE id = ?';
    const changeUserNotionStatus = await conn.query(
      changeUserNotionStatusQuery,
      [userId]
    );

    const removeNotionAccessQuery =
      'UPDATE notionaccess SET isRemoved = ? WHERE user_id = ?';
    const removeResult = await conn.query(removeNotionAccessQuery, [1, userId]);

    const removedDBIdQuery =
      'SELECT relatedNotionPageId FROM notionaccess WHERE user_id = ?';
    const removedResult = await conn.query(removedDBIdQuery, [userId]);
    console.log(removedResult);
    const removedDBId = removedResult[0][0].relatedNotionPageId;
    console.log(removedDBId);

    await conn.query('COMMIT');
    return { status: 'sucess Removed', removedDB: removedDBId };
  } catch (err) {
    console.log(err);
    await conn.query('ROLLBACK');
  } finally {
    await conn.release();
  }
};

// 存入針對某notion頁面(db)的accessToken以及關連到的頁面(db) id

// TODO:　這邊這幾個動作要加上交易 (或是改資料結構)
// FIXME: ????!!!!! model只做資料相關，notion連線拆
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
    console.log('notion回來的', data);
    const notionDatabaseid = data?.results[0]?.id;
    console.log('後端DB ID', notionDatabaseid);
    const notionDBLink = data?.results[0]?.url;

    // 存入SQL DB
    const insertNotionTokenQuery =
      'INSERT INTO notionaccess SET user_id = ?, notionAccessToken =?, relatedNotionPageId = ?';
    const [result] = await sqlDB.query(insertNotionTokenQuery, [
      userId,
      accessToken,
      notionDatabaseid,
    ]);

    // 存入notion URL
    const updateURLinUser =
      'UPDATE user set notionConnect = 1, notiondblink = ? WHERE id = ? ';
    await sqlDB.query(updateURLinUser, [notionDBLink, userId]);

    // // 返回DB id, accessToken給前端
    return data?.results[0];
  } catch (err) {
    console.log('notion API error', err);
  }
};

// FIXME: notion連線拆出來
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
  notes
) => {
  // 建立notion連線 TODO: 參考sql連線方式 傳入accessToken
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
      // {
      //   object: 'block',
      //   to_do: {
      //     rich_text: [
      //       {
      //         text: {
      //           content: todoArray,
      //         },
      //       },
      //     ],
      //   },
      // },
    ],
  });
  // 拿到該頁連結
  return response;
};

module.exports = {
  saveNotionTokenAndPageId,
  notionTokenCheck,
  createPageInNotion,
  removeNotionConnect,
  recoverNotionConnect,
};
