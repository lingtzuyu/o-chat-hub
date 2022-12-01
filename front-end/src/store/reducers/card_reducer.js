import { cardActions } from '../actions/card_actions';
import { chatActions } from '../actions/chat_actions';

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
  isSavedButtonDisabled: true,
  isTransferButtonDisabled: true,
  isMessageViewOpen: false,
  isDeleteAlertOpen: false,
  messagesInQuickView: [],
  isExportTableOpen: false,
  notionStatus: null,
  notionPriority: null,
  addOrDeleteCardChange: 'test',
  isCancelButtonDisabeld: true,
  // lastFiveCards: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case cardActions.SET_MESSAGES_IN_QUICK_VIEW:
      return {
        ...state,
        messagesInQuickView: action.messagesInQuickView,
      };
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
    case cardActions.SET_EXPORT_TABLE:
      return {
        ...state,
        isExportTableOpen: action.isExportTableOpen,
      };
    case cardActions.SET_NOTOIN_STATUS:
      return {
        ...state,
        notionStatus: action.notionStatus,
      };
    case cardActions.SET_NOTOIN_PRIORITY:
      return {
        ...state,
        notionPriority: action.notionPriority,
      };
    case cardActions.SET_CARDS_BY_CATEGORY:
      return {
        ...state,
        cards: action.cards,
      };
    // 用新增的卡片以及前一次的state組成新陣列
    case cardActions.ADD_DELETE_CARD_CHANGE:
      return {
        ...state,
        cards: [action.addCard, ...state.cards],
        addOrDeleteCardChange: action.setCardChange,
      };
    // 選完人頭後，save Button才能亮起來
    case chatActions.SET_CHOSEN_CHAT_DETAILS: {
      return {
        ...state,
        isSavedButtonDisabled: action.isSavedButtonDisabled,
      };
    }
    case cardActions.SET_CANCEL_BUTTON_DISABLED: {
      return {
        ...state,
        isCancelButtonDisabeld: action.isCancelButtonDisabeld,
      };
    }
    // case cardActions.SET_LAST_FIVE_CARDS: {
    //   return {
    //     ...state,
    //     lastFiveCards: action.lastFiveCards,
    //   };
    // }

    default:
      return state;
  }
};

export default reducer;
