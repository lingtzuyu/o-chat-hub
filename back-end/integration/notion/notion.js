require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  //fetch from db later
  auth: 'secret_n6QCZEZ6kV0CLV9QtgUYtPHqYxpBqV3PZi30BzMPjfn',
});

const getDatabase = async () => {
  const response = await notion.databases.retrieve({
    //fetch from db later
    database_id: 'aa19bb73-6ecf-4f0c-9f33-097ef6f3ff15',
  });
  console.log('getDB by accessToken', response);
};

// getDatabase();

const createTickets = (title, category, messages, notes) => {
  notion.pages.create({
    parent: {
      // 指定哪個db id要創建
      type: 'database_id',
      database_id: 'aa19bb73-6ecf-4f0c-9f33-097ef6f3ff15',
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
      '%7CX_j': [
        {
          type: 'text',
          text: {
            content: category,
          },
        },
      ],
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
      nrgP: [
        {
          type: 'text',
          text: {
            content: messages,
          },
        },
      ],
      // notes，之後改成在block內
      '%7Dcjh': [
        {
          type: 'text',
          text: {
            content: 'This is a test note',
          },
        },
      ],
      // due date，格式待確認
      'z.OF': [
        {
          date: '2022-12-22',
        },
      ],
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

createTickets('Test title', 'test category', 'test messages', 'test content');

module.exports = { createTickets };

// createTickets(
//   'Test',
//   'test category123',
//   '123@gmail.com',
//   '{This is first message}, {This is second messaage}',
//   'This is notes'
// );
