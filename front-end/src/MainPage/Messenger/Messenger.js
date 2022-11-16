import React from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import { MeesageIfNoChosenContact } from './MeesageIfNoChosenContact';
import ChatBubblesCombined from './ChatBubblesCombined';

// const MessengerWrapper = styled('div')({
//   // 空間足夠時允許擴展
//   flexGrow: 1,
//   backgroundColor: 'white',
//   marginTop: '80px',
//   height: '920px',
//   display: 'flex',
// });

const Messenger = ({ chosenChatDetails }) => {
  // chosenChatDetails如果忘記，想想你在MessageStatusBar.js那編取值卡多久
  console.log('Messenger內', chosenChatDetails);
  return (
    // MessengerContent裡面的東西會根據chosenChatDetails來做相對應的找DB及渲染
    <>
      {!chosenChatDetails ? (
        <MeesageIfNoChosenContact />
      ) : (
        <ChatBubblesCombined chosenChatDetails={chosenChatDetails} />
      )}
    </>
  );
};

// chat: chatReducer
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(Messenger);
