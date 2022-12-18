import store from '../../store/store';
import { setMessages } from '../../store/actions/chat_actions';

// 改變store內的東西狀態來渲染物件
// actions內的CHAT.SET_MESSAGES
const updateDirectMessageIfMatch = (data) => {
  const { participants, messages } = data;

  // receiverID可以在redux內的chat.chosenChatDetails內解出來
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userInfoDetail?.id;

  if (userId && receiverId) {
    const participantsOfChat = [receiverId, userId];

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
    },
  );

  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export { updateDirectMessageIfMatch };
