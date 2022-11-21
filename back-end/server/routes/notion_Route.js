require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const { wrapAsync } = require('../../util/util');
const { verifiedAuth } = require('../controllers/auth_controller');
const { getNotionToken } = require('../controllers/notion_controller');

router
  .route('/notion/:code')
  .get(wrapAsync(verifiedAuth), wrapAsync(getNotionToken));

// router.route('/notion/:code').get(async (req, res) => {
//   const { code } = req.params;
//   console.log('前端回傳的code', code);

//   // Generate an access token with the code we got earlier and the client_id and client_secret we retrived earlier
//   const response = await axios({
//     method: 'POST',
//     url: 'https://api.notion.com/v1/oauth/token',
//     auth: {
//       username: 'f4d9f3a8-e20f-43d2-9f5f-cf62e2baec60',
//       password: process.env.NOTION_CLIENT_SECRET,
//     },
//     headers: { 'Content-Type': 'application/json' },
//     data: { code, grant_type: 'authorization_code' },
//   });

//   console.log(response.data);

//   // You want to save resp.data.workspace_id and resp.data.access_token if you want to make requests later with this Notion account (otherwise they'll need to reauthenticate)

//   // Use the access token we just got to search the user's workspace for databases
//   const { data } = await axios({
//     method: 'POST',
//     url: 'https://api.notion.com/v1/search',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${response.data.access_token}`,
//       'Notion-Version': '2022-02-22',
//     },
//     data: { filter: { property: 'object', value: 'database' } },
//   });
//   console.log('後端', data?.results);
//   res.json(data?.results);
// });

module.exports = router;