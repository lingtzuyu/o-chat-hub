import * as React from 'react';
import styled from '@emotion/styled';
import MessageTextField from './MessageTextField';
import ChatBubblesCombined from './ChatBubblesCombined';

const MessageContentAreaMainContainer = styled('div')({
  width: '90%',
  height: '88%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'grey',
  align: 'center',
});

// 上半部分
const MessageAreaContainer = styled('div')({
  width: '100%',
  height: '90%',
  display: 'flex',
  backgroundColor: 'white',
  align: 'center',
});

export const MessageContentArea = () => {
  return (
    <MessageContentAreaMainContainer>
      <MessageAreaContainer>
        <ChatBubblesCombined />
      </MessageAreaContainer>
      <MessageTextField />
    </MessageContentAreaMainContainer>
  );
};
