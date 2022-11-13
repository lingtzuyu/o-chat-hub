import React, { useRef, useEffect } from 'react';

// https://ithelp.ithome.com.tw/articles/10266635
// useRef 只會回傳一個值，這個值是一個有 current 屬性的物件。
// current 值並不會觸發 re-render
// 可以用來避免元件第一次 render 時，useEffect 內的程式碼執行

import { styled } from '@mui/system';
import { MessageAreaHeader } from './MessageAreaHeader';
import { connect } from 'react-redux';

const MessagesContainer = styled('div')({
  // 卷軸
  overflow: 'auto',
  height: 'calc(100%-60px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MessagesContainer>
      {/*  chosenDetail內有name值就秀，沒有就undefined */}
      <MessageAreaHeader name={chosenChatDetails?.name} />
    </MessagesContainer>
  );
};

// 勾chatReducer
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(Messages);
