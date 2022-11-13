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
        // friends action 內的代的data來的
        // 回到頁面呈現 FriendsUsernameList.js 那邊map data
        friends: action.friends,
      };

    case friendActions.SET_PENDING_INVITATION:
      return {
        ...state,
        pendingInvitation: action.pendingInvitation,
      };

    // 如果這個case被dispatch，onlineUsers就會被set
    // 去該元件的地方確認
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
