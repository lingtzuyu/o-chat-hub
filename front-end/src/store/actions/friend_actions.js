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
  };
};

// dispatch this action to store state (socket事件中的friendInvitation事件)
const setPendingFriendsInvite = (pendingFriendsInvite) => {
  return {
    type: friendActions.SET_PENDING_INVITATION,
    pendingFriendsInvite,
  };
};

const sendFriendRequest = (data, closePopout) => {
  return async (dispatch) => {
    // 這邊response要await不然有可能爆掉
    // TODO: 之後要dispatch到某個popout alert上
    const response = await api.sendFriendRequest(data);
    if (response.error) {
      console.log(response.exception?.response?.data);
      // TODO: show error message from API in alert, error是從login apis那邊的exception來的， 後面可以做alert Popout
    } else {
      console.log('Invitation sent');
      // TODO: 做alert popout來dispatch message
      // 如果沒事的話，就關閉這個邀請好友的popout
      closePopout();
    }
  };
};

export { setPendingFriendsInvite, sendFriendRequest, getActions };
