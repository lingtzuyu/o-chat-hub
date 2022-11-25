import { cardActions } from '../actions/card_actions';

//初始化state，避免最開始取得的state是undefined
// 設定reducer function，第一個參數為state，第二個參數為action
// 目前action尚未被指派任務，而這個function目前只會回傳state。

// 初始值為array，透過array儲存多筆
const initState = {
  // default 是 disabled
  isSelectMessageBoxDisabled: 'hidden',
  // fefault 是 全plain => 出現換成"outlined"
  isSelectedMessageBoxShown: 'hidden',
  cardCategories: [],
  selectedCategoryForNote: null,
  transferredMessgaesNote: [],
  noteId: null,
  cards: [],
  cardsToBeExporting: [],
  exportedCards: [],
  isSavedButtonDisabled: false,
  isTransferButtonDisabled: true,
  isMessageViewOpen: false,
  isDeleteAlertOpen: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case cardActions.SHOW_SELECTE_MESSAGE_BOX:
      return {
        ...state,
        // should receive true
        isSelectMessageBoxDisabled: action.isDisabled,
        isSelectedMessageBoxShown: action.isShown,
      };
    case cardActions.SET_CARD_CATEGORY:
      return {
        ...state,
        cardCategories: action.categories,
      };
    case cardActions.SET_TRANSFFERED_MESSAGES_NOTE:
      return {
        ...state,
        transferredMessgaesNote: action.transfferedMessages,
        noteId: action.noteId,
      };
    case cardActions.SET_SELECTED_CATEGORY_FOR_NOTE:
      return {
        ...state,
        selectedCategoryForNote: action.selectedCategory,
      };
    case cardActions.SET_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    case cardActions.SET_EXPORTING_CARD:
      return {
        ...state,
        cardsToBeExporting: action.cardsToBeExporting,
      };
    case cardActions.SET_SAVEMESSAGE_BUTTON_DISABLED:
      return { ...state, isSavedButtonDisabled: action.isSavedButtonDisabled };
    case cardActions.SET_TRANSFER_BUTTON_DISABLED:
      return {
        ...state,
        isTransferButtonDisabled: action.isTransferButtonDisabled,
      };
    case cardActions.SET_MESSAGEVIEW_OPEN:
      return {
        ...state,
        isMessageViewOpen: action.isMessageViewOpen,
      };
    case cardActions.SET_DELETE_ALERT_OPEN:
      return {
        ...state,
        isDeleteAlertOpen: action.isDeleteAlertOpen,
      };

    default:
      return state;
  }
};

export default reducer;
