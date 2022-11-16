import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import MessageTextField from './MessageTextField';
import ChatBubblesCombined from './ChatBubblesCombined';
import Messenger from './Messenger';
import { getDirectMessageHistroy } from '../../chat/socketConnectionClient';
import { connect } from 'react-redux';

const MessageContentAreaMainContainer = styled('div')({
  width: '90%',
  height: '88%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'grey',
  align: 'center',
});

// 下半部分 (包含 input)
const MessageAreaContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
  height: '90%',
  display: 'flex',
  backgroundColor: 'white',
  align: 'center',
});

export const MessageContentArea = ({ chosenChatDetails }) => {
  console.log('messageContentArea', chosenChatDetails);
  // useEffect(() => {
  //   getDirectMessageHistroy({
  //     receiverUserId: chosenChatDetails.id,
  //   });
  // }, [chosenChatDetails]);

  return (
    <MessageContentAreaMainContainer>
      <MessageAreaContainer>
        <Messenger />
      </MessageAreaContainer>
      <MessageTextField />
    </MessageContentAreaMainContainer>
  );
};
