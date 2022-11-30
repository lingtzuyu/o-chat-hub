// 取代ChatBubble.js
import React, { useState } from 'react';

import FakeAvatar from '../../shared/images/fake_avatar.png';

import styled from '@emotion/styled';
import Checkbox from '@mui/joy/Checkbox';

import { MessageBox } from 'react-chat-elements';

import { connect } from 'react-redux';

const SingleMessageBoxContainer = styled('div')({
  height: '10%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
});

const SaveMessageButtonContainer = styled('div')({
  width: '10%',
});

const MessageContentWrapper = styled('div')({
  width: '90%',
});

const MessageLeft = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
  mapKey,
  isSelectMessageBoxDisabled,
  isSelectedMessageBoxShown,
}) => {
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';

  // TODO: change later to real avatar
  const photoURL = FakeAvatar;
  const displayName = username ? username : 'no username';
  const [selected, setSelected] = useState(false);

  // 處理即將進入卡片區的訊息
  const handleSelected = () => {
    let MessageCollectionArray = [];
    const selectedMessage = {
      messageId: mapKey,
      message: content,
      sender: username,
      time: date,
    };

    if (!selected) {
      setSelected(true);

      // 直接存入
      if (!window.localStorage.getItem('selectedMessagesCollection')) {
        MessageCollectionArray.push(selectedMessage);
        window.localStorage.setItem(
          'selectedMessagesCollection',
          JSON.stringify(MessageCollectionArray)
        );
      } else {
        // parse localStorage內的array後，push新selected並存入
        const messageCollectionFromLocal = JSON.parse(
          window.localStorage.getItem('selectedMessagesCollection')
        );

        messageCollectionFromLocal.push(selectedMessage);
        window.localStorage.setItem(
          'selectedMessagesCollection',
          JSON.stringify(messageCollectionFromLocal)
        );
      }
    } else {
      setSelected(false);
      let messageArrayToBeRemoved = JSON.parse(
        window.localStorage.getItem('selectedMessagesCollection')
      );

      // find object and index, then remove it if unclick

      const removedMessage = messageArrayToBeRemoved.find(
        (message) => message.messageId === mapKey
      );
      const removedIndex = messageArrayToBeRemoved.indexOf(removedMessage);

      messageArrayToBeRemoved.splice(removedIndex, 1);

      window.localStorage.setItem(
        'selectedMessagesCollection',
        JSON.stringify(messageArrayToBeRemoved)
      );
    }
  };

  return (
    <SingleMessageBoxContainer>
      <SaveMessageButtonContainer>
        <Checkbox
          variant={isSelectedMessageBoxShown}
          checked={selected}
          onChange={handleSelected}
          disabled={isSelectMessageBoxDisabled}
        />
      </SaveMessageButtonContainer>
      <MessageContentWrapper>
        <MessageBox
          position={'left'}
          type={'text'}
          title={displayName}
          titleColor="#AD8B73"
          text={message}
          date={timestamp}
          avatar={photoURL}
        />
      </MessageContentWrapper>
    </SingleMessageBoxContainer>
  );
};

const MessageRight = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
  mapKey,
  isSelectMessageBoxDisabled,
  isSelectedMessageBoxShown,
}) => {
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';

  // TODO: change later to real avatar
  const photoURL = FakeAvatar;
  const displayName = username ? username : 'no username';
  const [selected, setSelected] = useState(false);

  // 處理即將進入卡片區的訊息
  const handleSelected = () => {
    let MessageCollectionArray = [];
    const selectedMessage = {
      messageId: mapKey,
      message: content,
      sender: username,
      time: date,
    };

    if (!selected) {
      setSelected(true);

      // 直接存入
      if (!window.localStorage.getItem('selectedMessagesCollection')) {
        MessageCollectionArray.push(selectedMessage);
        window.localStorage.setItem(
          'selectedMessagesCollection',
          JSON.stringify(MessageCollectionArray)
        );
      } else {
        // parse localStorage內的array後，push新selected並存入
        const messageCollectionFromLocal = JSON.parse(
          window.localStorage.getItem('selectedMessagesCollection')
        );

        messageCollectionFromLocal.push(selectedMessage);
        window.localStorage.setItem(
          'selectedMessagesCollection',
          JSON.stringify(messageCollectionFromLocal)
        );
      }
    } else {
      setSelected(false);
      let messageArrayToBeRemoved = JSON.parse(
        window.localStorage.getItem('selectedMessagesCollection')
      );

      // find object and index, then remove it if unclick

      const removedMessage = messageArrayToBeRemoved.find(
        (message) => message.messageId === mapKey
      );
      const removedIndex = messageArrayToBeRemoved.indexOf(removedMessage);

      messageArrayToBeRemoved.splice(removedIndex, 1);

      window.localStorage.setItem(
        'selectedMessagesCollection',
        JSON.stringify(messageArrayToBeRemoved)
      );
    }
  };

  return (
    <SingleMessageBoxContainer>
      <SaveMessageButtonContainer>
        <Checkbox
          variant={isSelectedMessageBoxShown}
          checked={selected}
          onChange={handleSelected}
          disabled={isSelectMessageBoxDisabled}
        />
      </SaveMessageButtonContainer>
      <MessageContentWrapper>
        <MessageBox
          position={'left'}
          type={'text'}
          title={displayName}
          titleColor="#CEAB93"
          text={message}
          date={timestamp}
          avatar={photoURL}
        />
      </MessageContentWrapper>
    </SingleMessageBoxContainer>
  );
};

export const MessagesList = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
  mapKey,
  isSelectMessageBoxDisabled,
  isSelectedMessageBoxShown,
}) => {
  if (fromMe && sameTime) {
    return (
      <MessageRight
        content={content}
        username={username}
        fromMe={fromMe}
        date={date}
        sameTime={sameTime}
        mapKey={mapKey}
        isSelectMessageBoxDisabled={isSelectMessageBoxDisabled}
        isSelectedMessageBoxShown={isSelectedMessageBoxShown}
      />
    );
  }
  return (
    <MessageLeft
      content={content}
      username={username}
      fromMe={fromMe}
      date={date}
      sameTime={sameTime}
      mapKey={mapKey}
      isSelectMessageBoxDisabled={isSelectMessageBoxDisabled}
      isSelectedMessageBoxShown={isSelectedMessageBoxShown}
    />
  );
};

const mapStoreStateToProps = ({ card }) => {
  return {
    ...card,
  };
};

export default connect(mapStoreStateToProps)(MessagesList);
