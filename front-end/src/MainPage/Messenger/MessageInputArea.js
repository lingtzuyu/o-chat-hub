// 無用 => to MessageTextField.js

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import { sendDirectMessge } from '../../chat/socketConnectionClient';

const MainWrapper = styled('div')({
  height: '80px',
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const InputField = styled('input')({
  backgroundColor: 'grey',
  height: '60px',
  width: '90%',
  borader: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  padding: '0 10px',
});

// 從state拿chosenChatDetails的user Id (可以檢查redux dev tool)
const MessageInputArea = ({ chosenChatDetails }) => {
  // keep the state of message to be sent by useState()
  const [messageToBeSent, setMessageToBeSent] = useState('');

  // 監聽onChange的event
  const handleInputAreaChange = (event) => {
    setMessageToBeSent(event.target.value);
  };

  // send Messaages to mongoDB

  const sendMessages = () => {
    console.log('send Message to DB successful');

    // TODO: 在socketConnection中設立發訊息事件
    // 防止空的messgage
    if (messageToBeSent.length > 0) {
      sendDirectMessge({
        // 選擇好友的時候會存入的
        receiverId: chosenChatDetails.id,
        content: messageToBeSent,
      });
    }
    // setMessage空直要放在送出資料後面，不然會直接先清空
    setMessageToBeSent('');
  };

  // 按下按鍵後就執行send Message
  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendMessages();
    }
  };

  return (
    <MainWrapper>
      <InputField
        placehoder={`Send to ${chosenChatDetails.name}`}
        value={messageToBeSent}
        onChange={handleInputAreaChange}
        onKeyDown={handleKeyPressed}
      ></InputField>
    </MainWrapper>
  );
};

// 從chat Rducer拿到chat並解構
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(MessageInputArea);
