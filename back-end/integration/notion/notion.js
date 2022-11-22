require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  //fetch from db later
  auth: 'secret_n6QCZEZ6kV0CLV9QtgUYtPHqYxpBqV3PZi30BzMPjfn',
});

const getDatabase = async () => {
  const response = await notion.databases.retrieve({
    //fetch from db later
    database_id: '9a091268-eec3-4d12-af9b-e1dbffdec36b',
  });
  console.log('getDB by accessToken', response);
};

getDatabase();

const createTickets = (title, category, messages) => {
  notion.pages.create({
    parent: {
      database_id: '9a091268-eec3-4d12-af9b-e1dbffdec36b',
    },
    properties: {
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
      // Messages
      nrgP: [
        {
          type: 'text',
          text: {
            content: messages,
          },
        },
      ],
      '%7Dcjh': [
        {
          type: 'text',
          text: {
            content: 'This is a test note',
          },
        },
      ],
    },
  });
};

module.exports = { createTickets };

// createTickets(
//   'Test',
//   'test category123',
//   '123@gmail.com',
//   '{This is first message}, {This is second messaage}',
//   'This is notes'
// );
