import axios from 'axios';

// 建立後端API連線，不要衝3000
const apiAdress = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: apiAdress,
  timeout: 5000,
});

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
const sendFriendInvitation = async (data) => {
  try {
    console.log('1');
    return await apiClient.post('/friend/invite', data);
  } catch (exception) {
    return { error: true, exception };
  }
};

// const checkStatusCode = (exception) => {
//   const statusCode = exception?.response?.status;
//   if (statusCode) {
//     // TODO: 之後可以考慮401或是403的auth問題時做登出 logout()
//     console.log(statusCode);
//     return statusCode;
//   }
// };

export { login, signup, sendFriendInvitation };
