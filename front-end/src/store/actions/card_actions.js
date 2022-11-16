// 改變state的唯一方法，就是透過action
// action不過就是javascript的object
// type: 每個action都會有type屬性來描述state該怎麼改變。
// payload: 在下方的範例裡，payload是一篇新文章，reducer將在之後把這篇文章加到state。

export const cardActions = {
  ADD_CARD: 'CARDS.SET_CARD',
};

// {
//   type: 'ADD_ARTICLE',
//   payload: { name: 'React Redux Tutorial', id: 1 }
// }

export const getActions = (dispatch) => {
  return {
    addCard: (selectedMessages) => dispatch(addCard(selectedMessages)),
  };
};

// 處理action最好的方法就是將每個action都包在function內，像這樣的function就是action creator
export const addCard = (data) => {
  let messagesToBeTransferring = [];
  messagesToBeTransferring.push(data);
  return {
    type: cardActions.ADD_CARD,
    messagesToBeTransferring,
  };
};
