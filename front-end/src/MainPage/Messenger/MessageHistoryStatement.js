import React from 'react';
import { connect } from 'react-redux';
import { MeesageIfNoChosenContact } from './MeesageIfNoChosenContact';
import ChatBubblesCombined from './ChatBubblesCombined';

const MessageHistoryStatement = ({ chosenChatDetails }) => {
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

export default connect(mapStoreStateToProps)(MessageHistoryStatement);
