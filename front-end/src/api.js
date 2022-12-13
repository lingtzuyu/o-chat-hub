import axios from 'axios';
import { logout } from './shared/utils/generalAuth';

// 建立後端API連線
const apiAdress = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: apiAdress,
  timeout: 30000,
});

// modify card title and notes
const modifyCardTitleAndNotes = async (cardId, title, notes, token) => {
  try {
    const response = await apiClient.post('/card/modification', {
      cardId: cardId,
      title: title,
      notes: notes,
      token: token,
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// recover (change status) notion link
const recoverPreviousNotionConnect = async (userId, token) => {
  try {
    const response = await apiClient.post('/notion/recover', {
      userId: userId,
      token: token,
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// remove (change status) notoin link
const setNotionDisconnect = async (userId, token) => {
  try {
    const response = await apiClient.post('/notion/removal', {
      userId: userId,
      token: token,
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// export to Notion (正式)
const exportToNotion = async (data) => {
  try {
    const response = await apiClient.post('/notion/export', data);
    return response;
  } catch (err) {
    return { error: true, err };
  }
};

// delete Card By Id, data帶著id過來
const deleteCard = async (data) => {
  try {
    return await apiClient.delete('/card/notes', data);
  } catch (err) {
    return { error: true, err };
  }
};

// export to notion route
const exportToNotionAPI = async (data) => {
  try {
    return await apiClient.post('/notion/export/card', data);
  } catch (err) {
    return { error: true, err };
  }
};

// login request (這邊是公開route)
const login = async (data) => {
  try {
    // 往這邊打API及送資料
    return await apiClient.post('/login', data);
  } catch (exception) {
    // 除了200以外的
    return { error: true, exception };
  }
};

const signup = async (data) => {
  try {
    return await apiClient.post('/register', data);
  } catch (exception) {
    return { error: true, exception };
  }
};

// route after login
const sendFriendRequest = async (data) => {
  try {
    return await apiClient.post('/friend/invitation', data);
  } catch (exception) {
    checkStatusCode(exception);
    return { error: true, exception };
  }
};

// 接受或是拒絕好友的API
const acceptInvite = async (data) => {
  try {
    return await apiClient.post('/friend/accept', data);
  } catch (exception) {
    checkStatusCode(exception);
    return { error: true, exception };
  }
};

const rejectInvite = async (data) => {
  try {
    return await apiClient.post('/friend/reject', data);
  } catch (exception) {
    checkStatusCode(exception);
    return { error: true, exception };
  }
};

const checkStatusCode = (exception) => {
  const statusCode = exception?.response?.status;
  if (statusCode === 401 || statusCode === 403) {
    // 401或是403的auth問題時做登出 logout()
    logout();
  }
};

// 取得當前卡片分類資料 (因應未來擴充或是讓使用者自己自訂的可能性)
const fetchCardCategory = async () => {
  try {
    return await apiClient.get('/card/category');
  } catch (exception) {
    return { error: true, exception };
  }
};

// 存資料進入mongoDB，data會是{category:"", messagesToBeSaved:[{},{},{}...]}
const saveMessagesToNote = async (data) => {
  try {
    return await apiClient.post('/card/notes', data);
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// 取得卡片歷史紀錄，mail用token來解
// https://masteringjs.io/tutorials/axios/get-with-data
const getCardHistory = async (data) => {
  try {
    const result = await apiClient.get('/card/notes', {
      params: { token: data },
    });
    const cards = result.data;
    return cards;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// fetch last 5 for notification
// const getLastFiveCard = async (data) => {
//   try {
//     const result = await apiClient.get('/card/lastfive', {
//       params: { token: data },
//     });
//   } catch (err) {
//     console.log(err);
//     return { error: true, err };
//   }
// };

// category serach API
const fetchCardByCategory = async (category, token, fromId) => {
  try {
    console.log('api.js內', fromId);
    const response = await apiClient.get(`/card/details/${category}`, {
      params: { token: token, category: category, fromId: fromId },
    });
    return response;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// get notion accessToken to certain DB
const getNotionToken = async (code, token) => {
  try {
    const response = await apiClient.post(`/notion/token`, {
      code: code,
      token: token,
    });
    console.log('這邊的res', response);
    return response.status;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// like or dislike card
const likeCard = async (data) => {
  try {
    return await apiClient.patch('/card/like', data);
  } catch (err) {
    return { error: true, err };
  }
};

const dislikeCard = async (data) => {
  try {
    return await apiClient.patch('/card/dislike', data);
  } catch (err) {
    return { error: true, err };
  }
};

// 把getUserProfile移到homepage
const getUserProfile = async (token) => {
  try {
    return await apiClient.get('/friend/userProfile', {
      headers: {
        authorization: token,
      },
    });
  } catch (err) {
    return { error: true, err };
  }
};

const updateUserName = async (accessToken, userName, organization) => {
  try {
    const response = await apiClient.post('/auth/username', {
      token: accessToken,
      username: userName,
      organization: organization,
    });
    return response.status;
  } catch (err) {
    return { error: true, err };
  }
};

const updateCategory = async (accessToken, cardId, category) => {
  try {
    const response = await apiClient.post('/card/changecategory', {
      token: accessToken,
      category: category,
      cardId: cardId,
    });
    return response;
  } catch (err) {
    return { error: true, err };
  }
};

const getFriendUserName = async (friendId, userId, accessToken) => {
  try {
    const result = await apiClient.get('/friend/username', {
      params: { token: accessToken, userId: userId, friendId: friendId },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

export {
  login,
  signup,
  sendFriendRequest,
  acceptInvite,
  rejectInvite,
  fetchCardCategory,
  saveMessagesToNote,
  getCardHistory,
  getNotionToken,
  exportToNotionAPI,
  deleteCard,
  likeCard,
  dislikeCard,
  exportToNotion,
  fetchCardByCategory,
  getUserProfile,
  updateUserName,
  setNotionDisconnect,
  recoverPreviousNotionConnect,
  modifyCardTitleAndNotes,
  updateCategory,
  getFriendUserName,
};
