import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import { ChatBubble } from './ChatBubble';
import { getDirectMessageHistroy } from '../../chat/socketConnectionClient';
import { Checkbox } from '@mui/material';

const ChatBubblesCombinedContainer = styled('div')({
  // 卷軸
  overflow: 'auto',
  width: '100%',
  height: 'calc(100%-60px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ChatBubblesCombined = ({ chosenChatDetails, messages }) => {
  // const [selected, setSelected] = useState(false);
  // const handleSelected = () => {
  //   if (!selected) {
  //     console.log(messages);
  //     setSelected(true);

  //     // TODO: 一個function將被選取的資料push進入array
  //   } else {
  //     setSelected(false);
  //     // TODO: 一個function將被選取的資料丟出array
  //   }
  // };
  // 點選到chosenChatDetail，渲染選中的人的歷史訊息
  useEffect(() => {
    getDirectMessageHistroy({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <>
      {/* map DB取得的訊息 */}
      <ChatBubblesCombinedContainer>
        {messages.map((message, index) => {
          const sameSender =
            index > 0 && messages[index].sender === messages[index - 1].sender;
          return (
            <>
              {/* <Checkbox checked={selected} onChange={handleSelected} /> */}
              <ChatBubble
                key={message._id}
                mapKey={message._id}
                content={message.body}
                username={message.senderMail}
                fromMe={sameSender}
                date={message.date}
                sameTime={true}
              />
            </>
          );
        })}
      </ChatBubblesCombinedContainer>
    </>
  );
};

// 勾chatReducer
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(ChatBubblesCombined);
