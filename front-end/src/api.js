import axios from 'axios';
import { logout } from './shared/utils/generalAuth';

// 建立後端API連線，不要衝3000
const apiAdress = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: apiAdress,
  timeout: 30000,
});

// delete Card By Id, data帶著id過來
const deleteCard = async (data) => {
  try {
    return await apiClient.post('/card/delete', data);
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
    const result = await apiClient.get('/card/history', {
      params: { token: data },
    });
    const cards = result.data;
    return cards;
  } catch (err) {
    console.log(err);
    return { error: true, err };
  }
};

// get notion accessToken to certain DB
const getNotionToken = async (code) => {
  try {
    const response = await apiClient.get('/notion/', {
      params: { code: code },
    });
    return response;
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
};
