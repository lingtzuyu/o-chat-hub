// 設定兩種chat type
const chatTypes = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
};

// redux
const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
  SET_MESSAGES: 'CHAT.SET_MESSAGES',
  SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE',
};

const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
  };
};

// 選chat大頭的時候
const setChosenChatDetails = (chatDetails, type) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatType: type,
    chatDetails,
  };
};

// 當有訊息的時候，傳到store
const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};

export {
  chatTypes,
  chatActions,
  getActions,
  setChosenChatDetails,
  setMessages,
};
