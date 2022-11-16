import React, { useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { sendDirectMessge } from '../../chat/socketConnectionClient';
import TextField from '@mui/material/TextField';

const MessageTextFieldContainer = styled('div')({
  height: '8%',
  width: '95%',
  display: 'flex',
  padding: '10px',
  alignItems: 'center',
  justifyContent: 'center',
});

const MessageTextField = ({ chosenChatDetails }) => {
  // keep the state of message to be sent by useState()
  const [messageToBeSent, setMessageToBeSent] = useState('');

  // 監聽onChange的event
  const handleInputAreaChange = (event) => {
    setMessageToBeSent(event.target.value);
    console.log('輸入的東西', event.target.value);
  };
  // send Messaages to mongoDB

  const sendMessages = () => {
    // TODO: 在socketConnection中設立發訊息事件
    // 防止空的messgage
    if (messageToBeSent.length > 0) {
      console.log(chosenChatDetails);
      sendDirectMessge({
        // 選擇好友的時候會存入的
        receiverId: chosenChatDetails.id,
        content: messageToBeSent,
      });
    }
    // setMessage空直要放在送出資料後面，不然會直接先清空
    setMessageToBeSent('');

    console.log('send Message to DB successful');
  };

  // 按下按鍵後就執行send Message
  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendMessages();
    }
  };

  return (
    <MessageTextFieldContainer>
      <TextField
        id="filled-basic"
        label="Messages to be sent"
        placeholder="Input your messages"
        variant="filled"
        // TODO: 之後可以做 multiline，要解決enter的小bug
        value={messageToBeSent}
        onChange={handleInputAreaChange}
        onKeyDown={handleKeyPressed}
        sx={{
          width: '100%',
          bgcolor: '#DFF6FF',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      />
    </MessageTextFieldContainer>
  );
};

// 從chat Rducer拿到chat並解構
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(MessageTextField);
