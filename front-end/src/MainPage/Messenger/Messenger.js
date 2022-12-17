import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MeesageIfNoChosenContact } from './MeesageIfNoChosenContact';
import ChatBubblesCombined from './ChatBubblesCombined';
import { getDirectMessageHistroy } from '../../chat/socketConnectionClient';

// const MessengerWrapper = styled('div')({
//   // 空間足夠時允許擴展
//   flexGrow: 1,
//   backgroundColor: 'white',
//   marginTop: '80px',
//   height: '920px',
//   display: 'flex',
// });

const Messenger = ({ chosenChatDetails }) => {
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
