import * as api from '../../api';

export const friendActions = {
  SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
  SET_PENDING_INVITATION: 'FRIENDS.SET_PENDING_INVITATION',
  SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
};

const getActions = (dispatch) => {
  return {
    // data以及關閉popout視窗
    sendFriendRequest: (data, closePopout) =>
      dispatch(sendFriendRequest(data, closePopout)),
    // accept邀請 (從InviteDataItems.js)來的，並且在這邊定義accpetInite&rejectInvite
    acceptInvite: (data) => dispatch(acceptInvite(data)),
    rejectInvite: (data) => dispatch(rejectInvite(data)),
  };
};

// dispatch this action to store state (socket事件中的friendInvitation事件)
const setPendingFriendsInvite = (pendingInvitation) => {
  return {
    type: friendActions.SET_PENDING_INVITATION,
    pendingInvitation,
  };
};

const sendFriendRequest = (data, closePopout) => {
  return async (dispatch) => {
    // 這邊response要await不然有可能爆掉
    // TODO: 之後要dispatch到某個popout alert上
    const response = await api.sendFriendRequest(data);
    if (response.error) {
      return response.exception?.response?.data;

      // TODO: show error message from API in alert, error是從login apis那邊的exception來的， 後面可以做alert Popout
    } else {
      closePopout();
    }
  };
};

const acceptInvite = (data) => {
  // 要非同步 (因為這邊要call api)
  return async (dispatch) => {
    // call api.js那邊的acceptInvite
    const response = await api.acceptInvite(data);
    // 錯誤處理
    if (response.error) {
    } else {
    }
  };
};
const rejectInvite = (data) => {
  return async (dispatch) => {
    // call api.js那邊的acceptInvite
    const response = await api.rejectInvite(data);
    // 錯誤處理
    if (response.error) {
      return response.exception?.response?.data;
    } else {
    }
  };
};

const showFriends = (friends) => {
  return {
    // type of the action 要dispatch的
    // check reducer是否有接到此case
    type: friendActions.SET_FRIENDS,
    friends,
  };
};

const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};
// check friend reducer

export {
  setPendingFriendsInvite,
  sendFriendRequest,
  getActions,
  showFriends,
  setOnlineUsers,
};
