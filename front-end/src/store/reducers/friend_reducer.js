import { friendActions } from '../actions/friend_actions';
// 好友相關的狀態處理派發
const initState = {
  friends: [],
  pendingInvitation: [],
  onlineUsers: [],
};

const reducer = (state = initState, action) => {
  // 在friends相關的action (friends_action)引入
  switch (action.type) {
    // 原本的state 以及上方的initState
    case friendActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };

    case friendActions.SET_PENDING_INVITATION:
      return {
        ...state,
        pendingInvitation: action.pendingInvitation,
      };

    case friendActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
};

export default reducer;
