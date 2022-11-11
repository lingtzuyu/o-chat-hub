import notificationActions from '../actions/notification_action';
// 這邊控制是否要出現
const initState = {
  showNotification: false,
  notificationContent: null,
};

// create action to change state
const reducer = (state = initState, action) => {
  // 根據action type來swithch
  switch (action.type) {
    case notificationActions.OPEN_NOTIFY_MESSAGE:
      return {
        ...state,
        showNotification: true,
        notificationContent: action.content,
      };
    case notificationActions.CLOSE_NOTIFY_MESSAGE:
      return { ...state, showNotification: false, notificationContent: null };
    default:
      return state;
  }
};

export default reducer;

// once if you initial state, then you can go to action folder
// TODO: 定義action的各種狀況後，再回來寫case
