const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: 'secret_3h79pLFFAGpR2rUbr9xf4BJt4atkgTmLXIJwPARBz4e',
});

const getDatabase = async () => {
  const response = await notion.databases.retrieve({
    database_id: '1f004ef4-6d6b-4008-a0ef-8b5d2bdad1af',
  });
  console.log('getDB by accessToken', response);
};

getDatabase();
