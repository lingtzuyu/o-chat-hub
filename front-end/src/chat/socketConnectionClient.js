import io from 'socket.io-client';

let socket = null;

export const connectSocketBackend = (accessToken) => {
  // token 在localStorage.accessToken
  // 我直接在MainPage.js那邊設定變數是要帶accessToken

  socket = io(process.env.REACT_APP_SERVER_ROUTE, {
    // TODO:　如果jwttoken驗證通過，則可以進行通知
    // 把 jwt token塞到socket 訊息中
    auth: {
      token: accessToken,
    },
  });
  socket.on('connect', () => {
    console.log('client side connected, id: ', socket.id);
    console.log(socket);
  });
};
