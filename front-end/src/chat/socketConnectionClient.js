import io from 'socket.io-client';
import {
  setPendingFriendsInvite,
  showFriends,
  setOnlineUsers,
} from '../store/actions/friend_actions';
import store from '../store/store';

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

  // custom evnet: firneds-invitation
  // 確認此socket是否有pending的邀請
  socket.on('friendInvitations', (data) => {
    const { pendingInvitations } = data;
    console.log('friendInvitation event launch', pendingInvitations);
    // dispatch改變store state

    store.dispatch(setPendingFriendsInvite(pendingInvitations));
  });
  socket.on('friendListUpdate', (data) => {
    const { friends } = data;
    // 發到friend_actions給showFriends處理
    store.dispatch(showFriends(friends));
  });

  socket.on('onlineUsers', (data) => {
    console.log('check broadcast every 10s', data);
    // obj可以動態被加屬性，盡量不影響本來的邏輯
    const { onlineUsers } = data;
    // 有資料進來，就記得dispatch
    // 去friend_action接資料
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
