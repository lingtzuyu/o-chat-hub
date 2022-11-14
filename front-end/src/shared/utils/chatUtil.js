import store from '../../store/store';
import { setMessages } from '../../store/actions/chat_actions';

// 改變store內的東西狀態來渲染物件
// actions內的CHAT.SET_MESSAGES
const updateDirectMessageIfMatch = (data) => {
  const { participants, messages } = data;

  // receiverID可以在redux內的chat.chosenChatDetails內解出來
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  // TODO: 待改，應該要從getState拿比較安全
  const userIdString = localStorage.getItem('userId');
  const userId = parseInt(userIdString);
  // console.log("chatUtil來的receiverId",receiverId);
  // console.log("chatUtil來的receiverId",userId);
  if (userId && receiverId) {
    const participantsOfChat = [receiverId, userId];
    console.log(participantsOfChat);
    // 比對 送回來的{participants:[],messages:[]}
    // participants內的id要和receiverId及userId一樣
    updateChatHistoryIfChatExist({
      // participants是server回來的
      participants,
      // participantsOfChat是前端組起來的
      participantsOfChat,
      messages,
    });
  }
};

const updateChatHistoryIfChatExist = ({
  participants,
  participantsOfChat,
  messages,
}) => {
  const result = participants.every(
    // 確認全部的元素都通過 => true則把messages dispatch到store，之後用此物件渲染
    function (participantId) {
      // 後端傳回來的participants內每個元素，有沒有在前端組成的[receiver, user]內
      return participantsOfChat.includes(participantId);
    }
  );
  // TODO: redux state內message抓到空值，待修
  console.log('result in updateChatHistoryIfChatExist', result);
  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export { updateDirectMessageIfMatch };
