// 改變state的唯一方法，就是透過action
// https://codesandbox.io/s/0vm2w0k9r0?file=/src/actions/todo.actions.js:4-10
import * as api from '../../api';

export const cardActions = {
  SHOW_SELECTE_MESSAGE_BOX: 'CARDS.SHOW_SELECTE_MESSAGE_BOX',
  IS_MESSAGE_CHECKBOX_SELECTED: 'CARDS.IS_MESSAGE_CHECKBOX_SELECTED',
  SET_CARD_CATEGORY: 'CARDS.SET_CARD_CATEGORY',
  SET_SELECTED_CATEGORY_FOR_NOTE: 'CARDS.SET_SELECTED_CATEGORY_FOR_NOTE',
  SET_TRANSFFERED_MESSAGES_NOTE: 'CARD.SET_TRANSFFERED_MESSAGES_NOTE',
  SET_CARDS: 'CARDS.SET_CARDS',
  SET_EXPORTING_CARD: 'CARDS.SET_EXPORTING_CARD',
  EXPORT_TO_NOTION: 'CARDS.EXPORT_TO_NOTION',
  SET_EXPORTED_CARD: 'CARDS.SET_EXPORTED_CARD',
  SET_SAVEMESSAGE_BUTTON_DISABLED: 'CARDS.SET_SAVEMESSAGE_BUTTON_DISABLED',
  SET_TRANSFER_BUTTON_DISABLED: 'CARDS.SET_TRANSFER_BUTTON_DISABLED',
  SET_MESSAGEVIEW_OPEN: 'CARDS.SET_MESSAGEVIEW_OPEN',
  SET_DELETE_ALERT_OPEN: 'CARDS.SET_DELETE_ALERT_OPEN',
  SET_MESSAGES_IN_QUICK_VIEW: 'CARDS.SET_MESSAGES_IN_QUICK_VIEW',
};

export const getActions = (dispatch) => {
  return {
    showSelectMessageBox: (isDisabled, isShown) =>
      dispatch(showSelectMessageBox(isDisabled, isShown)),
    setCardCategory: (categories) => {
      dispatch(setCardCategory(categories));
    },
    fetchCardCategoryAction: () => {
      dispatch(fetchCardCategoryAction());
    },
    saveTransferredMessagesToMongo: (data) => {
      dispatch(saveTransferredMessagesToMongo(data));
    },
    setTransferredMessagesToStore: (data, noteId) => {
      dispatch(setTransferredMessagesToStore(data, noteId));
    },
    setSelectedCategoryForNote: (selectedCategory) => {
      dispatch(setSelectedCategoryForNote(selectedCategory));
    },
    fetchCardHistory: (data) => {
      dispatch(fetchCardHistory(data));
    },
    selecteExportCards: (cardsToBeExporting) => {
      dispatch(selecteExportCards(cardsToBeExporting));
    },
    exportToNotion: (data) => {
      dispatch(exportToNotion(data));
    },
    setSaveMessageButtonDisabled: (data) => {
      dispatch(setSaveMessageButtonDisabled(data));
    },
    setTransferButtonDisabled: (data) => {
      dispatch(setTransferButtonDisabled(data));
    },
    setMessageView: (data) => {
      dispatch(setMessageView(data));
    },
    // TODO: 待刪除
    setDeleteAlert: (data) => {
      dispatch(setDeleteAlert(data));
    },
    setMessagesArrayInQuickView: (data) => {
      dispatch(setMessagesArrayInQuickView(data));
    },
  };
};

// 設定state內的messages陣列
export const setMessagesArrayInQuickView = (data) => ({
  type: cardActions.SET_MESSAGES_IN_QUICK_VIEW,
  messagesInQuickView: data,
});

// 關閉確認刪除紀錄 boolean
export const setDeleteAlert = (data) => ({
  type: cardActions.SET_DELETE_ALERT_OPEN,
  isDeleteAlertOpen: data,
});

// 關閉記錄訊息快速瀏覽 boolean
export const setMessageView = (data) => ({
  type: cardActions.SET_MESSAGEVIEW_OPEN,
  isMessageViewOpen: data,
});

// transferMessageButton顯示
export const setTransferButtonDisabled = (data) => ({
  type: cardActions.SET_TRANSFER_BUTTON_DISABLED,
  isTransferButtonDisabled: data,
});

// saveMessageButton的顯示
export const setSaveMessageButtonDisabled = (data) => ({
  type: cardActions.SET_SAVEMESSAGE_BUTTON_DISABLED,
  isSavedButtonDisabled: data,
});

// 傳送至notion
export const exportToNotion = (data) => {
  return async (dispatch) => {
    console.log('1');
    api.exportToNotionAPI(data);
    dispatch(setExportedCard(data));
  };
};

export const setExportedCard = (data) => ({
  type: cardActions.SET_EXPORTED_CARD,
  exportedCards: data,
});

// 把卡片區的資訊狀態帶到輸出區，並且準備輸出
export const selecteExportCards = (cardsToBeExporting) => ({
  type: cardActions.SET_EXPORTING_CARD,
  cardsToBeExporting: cardsToBeExporting,
});

// 處理action最好的方法就是將每個action都包在function內，像這樣的function就是action creator
export const showSelectMessageBox = (isDisabled, isShown) => ({
  type: cardActions.SHOW_SELECTE_MESSAGE_BOX,
  // data should be true or false
  isDisabled: isDisabled,
  isShown: isShown,
});

export const fetchCardCategoryAction = () => {
  return async (dispatch) => {
    const categories = await api.fetchCardCategory();
    const categoriesArray = categories.data;
    // 儲存到全局狀態，之後其他頁面要修改狀態可以從這邊拿
    dispatch(setCardCategory(categoriesArray));
  };
};

export const setCardCategory = (categoriesArray) => {
  return { type: cardActions.SET_CARD_CATEGORY, categories: categoriesArray };
};

export const setSelectedCategoryForNote = (selectedCategory) => {
  return {
    type: cardActions.SET_SELECTED_CATEGORY_FOR_NOTE,
    selectedCategory: selectedCategory,
  };
};

// 將選中的資料存進mongoDB，並且dispatch到setTransferredMessgesToStore渲染右方用
export const saveTransferredMessagesToMongo = (data) => {
  return async (dispatch) => {
    const response = await api.saveMessagesToNote(data);
    const noteId = response.data.noteId;
    // TODO: 發送ALERT訊息到 (用response.systemInfo)
    dispatch(setTransferredMessagesToStore(data, noteId));
  };
};

export const setTransferredMessagesToStore = (data, noteId) => {
  console.log(noteId);
  return {
    type: cardActions.SET_TRANSFFERED_MESSAGES_NOTE,
    transfferedMessages: data.messagesToBeSaved,
    noteId: noteId,
  };
};

export const fetchCardHistory = (data) => {
  return async (dispatch) => {
    const cardHistory = await api.getCardHistory(data);
    dispatch(setCards(cardHistory));
  };
};

export const setCards = (cards) => {
  return { type: cardActions.SET_CARDS, cards };
};
