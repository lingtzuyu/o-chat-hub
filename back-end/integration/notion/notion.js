require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  //fetch from db later
  auth: 'secret_3dyvf7KZ0SwUIMnyoXXhlsDS38WpESm7664j5MFpqEd',
});

const getDatabase = async () => {
  const response = await notion.databases.retrieve({
    //fetch from db later
    database_id: 'b0c265b8-ab4f-4c8d-959a-54267d21a613',
  });
  console.log('getDB by accessToken', response);
};

// getDatabase();

const createTickets = (title, category, sender, messages, notes) => {
  notion.pages.create({
    parent: {
      database_id: 'b0c265b8-ab4f-4c8d-959a-54267d21a613',
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
            content: sender,
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
            content: notes,
          },
        },
      ],
    },
  });
};

createTickets(
  'Test',
  'test category',
  '123@gmail.com',
  '{This is first message}, {This is second messaage}',
  'This is notes'
);
