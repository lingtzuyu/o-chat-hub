import io from 'socket.io-client';

let socket;

export const connectSocketBackend = (token) => {
  // token 在localStorage.accessToken
  const jwtToken = localStorage.getItem('accessToken');
  socket = io('http://localhost:8080', {
    // TODO:　如果jwttoken驗證通過，則可以進行通知
    auth: {
      token: jwtToken,
    },
  });
  socket.on('connect', () => {
    console.log('client side connected, id: ', socket.id);
  });
};
