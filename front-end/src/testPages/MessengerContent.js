// 留

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MeesageIfNoChosenContact } from './component/MessageIfNoChosenContact';
import ChatContent from './ChatContent';

const MessengerContent = ({ chosenChatDetails }) => {
  // chosenChatDetails如果忘記，想想你在MessageStatusBar.js那編取值卡多久
  console.log('Messenger內', chosenChatDetails);

  // useEffect(() => {
  //   getDirectMessageHistroy({
  //     receiverUserId: chosenChatDetails.id,
  //   });
  // }, [chosenChatDetails]);
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
