// 留

import React from 'react';
import { connect } from 'react-redux';
import { MeesageIfNoChosenContact } from './component/MessageIfNoChosenContact';
import ChatContent from './ChatContent';

const MessengerContent = ({ chosenChatDetails }) => {
  return (
    // MessengerContent裡面的東西會根據chosenChatDetails來做相對應的找DB及渲染
    <>
      {!chosenChatDetails ? (
        <MeesageIfNoChosenContact />
      ) : (
        <ChatContent chosenChatDetails={chosenChatDetails} />
      )}
    </>
  );
};

// chat: chatReducer
const mapStoreStateToProps = ({ card, chat }) => {
  return { ...chat, ...card };
};

export default connect(mapStoreStateToProps)(MessengerContent);
