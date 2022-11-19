// 改變state的唯一方法，就是透過action
// action不過就是javascript的object
// type: 每個action都會有type屬性來描述state該怎麼改變。
// payload: 在下方的範例裡，payload是一篇新文章，reducer將在之後把這篇文章加到state。

// https://codesandbox.io/s/0vm2w0k9r0?file=/src/actions/todo.actions.js:4-10
import * as api from '../../api';

export const cardActions = {
  SHOW_SELECTE_MESSAGE_BOX: 'CARDS.SHOW_SELECTE_MESSAGE_BOX',
  IS_MESSAGE_CHECKBOX_SELECTED: 'CARDS.IS_MESSAGE_CHECKBOX_SELECTED',
  SET_CARD_CATEGORY: 'CARDS.SET_CARD_CATEGORY',
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
  };
};

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
    // 儲存到全局狀態
    dispatch(setCardCategory(categoriesArray));
  };
};

export const setCardCategory = (categoriesArray) => {
  return { type: cardActions.SET_CARD_CATEGORY, categories: categoriesArray };
};
