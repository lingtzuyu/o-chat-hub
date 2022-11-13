import { chatActions } from '../actions/chat_actions';

const initState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

const reducer = (state = initState, action) => {
  // 依照傳進來的action type 來switch
  // 這一串 type: chatActions.SET_SELECTED_CHAT_INFO,
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        //previoius state
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        // add logic for fetching from server later
        messages: [],
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

// if need to change the state, go to the store.js for the action

export default reducer;
