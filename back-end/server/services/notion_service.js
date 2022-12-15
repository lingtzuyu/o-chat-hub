require('dotenv').config();

const axios = require('axios');

const { Client } = require('@notionhq/client');

const NotionModel = require('../models/notion_model');

const { SQLException } = require('./exceptions/sql_exception');
const { Exception } = require('./exceptions/exception');
const { APIException } = require('./exceptions/api_exception');

const issueNotionRequest = async (code) => {
  const presentFunctionName = 'issueNotionRerquest';
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

    const notionToken = response.data.access_token;

    const { data } = await axios({
      method: 'POST',
      url: 'https://api.notion.com/v1/search',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${notionToken}`,
        'Notion-Version': '2022-02-22',
      },
      data: { filter: { property: 'object', value: 'database' } },
    });

    return {
      notionToken,
      notionDBid: data?.results[0]?.id,
      notionLink: data?.results[0]?.url,
    };
  } catch (err) {
    throw new APIException(
      'Error when connect to notion for access, please try again',
      'Error when connecting to notion',
      500,
      presentFunctionName,
    );
  }
};

const createNotionPage = (
  notionAccessToken,
  relatedNotionPageId,
  title,
  category,
  status,
  priority,
  from,
  messages,
  notes,
) => {
  const presentFunctionName = 'createNotionPage';
  try {
    const notion = new Client({
      auth: notionAccessToken,
    });

    const response = notion.pages.create({
      parent: {
        // notion db id
        type: 'database_id',
        database_id: relatedNotionPageId,
      },
      properties: {
        // page title
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

        // priority Low, Medium, High
        "'Hr%40": { name: priority },
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
      ],
    });
    // export notion page link
    return response;
  } catch (err) {
    throw new APIException(
      'Error when exporting to notion page, please try again',
      `Error when exporting to notion, card title${title}`,
      500,
      presentFunctionName,
    );
  }
};

module.exports = { issueNotionRequest, createNotionPage };
