require('dotenv').config();
const { Client } = require('@notionhq/client');

const {
  NOTION_CATEGORY_ID,
  NOTION_DUE_DATE_ID,
  NOTION_STATUS_ID,
  NOTION_FROM_ID,
  NOTION_PRIORITY_ID,
} = process.env;

const notion = new Client({
  //fetch from db later
  auth: 'secret_2u7llUpX7woZ12iGcS6ZijfEzuvUUSu9Po1SDPvnoxl',
});

const getDatabase = async () => {
  const response = await notion.databases.retrieve({
    //fetch from db later
    database_id: '27bc20b1-085d-423c-a494-b43985e10d60',
  });
  console.log('getDB by accessToken', response);
};

// getDatabase();

const createTickets = (title, messages, notes) => {
  notion.pages.create({
    parent: {
      // 指定哪個db id要創建
      type: 'database_id',
      database_id: '27bc20b1-085d-423c-a494-b43985e10d60',
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
      '%7CX_j': { name: 'Knowledge' },
      // status
      '3E6J': { name: 'Backlog' },
      // from (sender)
      'VHx%7B': [
        {
          type: 'text',
          text: {
            content: 'test0001@gmail.com',
          },
        },
      ],
      // Messages，之後改成在block內
      // nrgP: [
      //   {
      //     type: 'text',
      //     text: {
      //       content: messages,
      //     },
      //   },
      // ],
      // notes，之後改成在block內
      // '%7Dcjh': [
      //   {
      //     type: 'text',
      //     text: {
      //       content: 'This is a test note',
      //     },
      //   },
      // ],

      //優先 Low, Medium, High
      "'Hr%40": { name: 'Low' },

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
                link: { url: 'www.google.com' },
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
                link: { url: 'www.google.com' },
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
                content: 'test',
              },
            },
          ],
        },
      },
    ],
  });
};

createTickets('Test title', 'test messages', 'test content');

module.exports = { createTickets };

// createTickets(
//   'Test',
//   'test category123',
//   '123@gmail.com',
//   '{This is first message}, {This is second messaage}',
//   'This is notes'
// );
