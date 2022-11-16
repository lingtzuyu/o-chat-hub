import { cardActions } from '../actions/card_actions';

//初始化state，避免最開始取得的state是undefined
// 設定reducer function，第一個參數為state，第二個參數為action
// 目前action尚未被指派任務，而這個function目前只會回傳state。

// 初始值為array，透過array儲存多筆
const initState = {
  selectedMessages: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case cardActions.ADD_CARD:
      return {
        ...state,
        selectedMessages: action.selectedMessages,
      };
    default:
      return state;
  }
};

export default reducer;
