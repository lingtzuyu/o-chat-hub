// 改變state的唯一方法，就是透過action
// action不過就是javascript的object
// type: 每個action都會有type屬性來描述state該怎麼改變。
// payload: 在下方的範例裡，payload是一篇新文章，reducer將在之後把這篇文章加到state。

// https://codesandbox.io/s/0vm2w0k9r0?file=/src/actions/todo.actions.js:4-10

export const cardActions = {
  SHOW_SELECTE_MESSAGE_BOX: 'CARDS.SHOW_SELECTE_MESSAGE_BOX',
  IS_MESSAGE_CHECKBOX_SELECTED: 'CARDS.IS_MESSAGE_CHECKBOX_SELECTED',
};

export const getActions = (dispatch) => {
  return {
    showSelectMessageBox: (data) => dispatch(showSelectMessageBox(data)),
    turnCheckboxUnchecked: (data) => dispatch(turnCheckboxUnchecked(data)),
  };
};

// 處理action最好的方法就是將每個action都包在function內，像這樣的function就是action creator
export const showSelectMessageBox = (data) => ({
  type: cardActions.SHOW_SELECTE_MESSAGE_BOX,
  // data should be true or false
  data,
});

export const turnCheckboxUnchecked = (data) => ({
  type: cardActions.IS_MESSAGE_CHECKBOX_SELECTED,
  data,
});
