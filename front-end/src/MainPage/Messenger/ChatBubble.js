import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import FakeAvatar from '../../shared/images/fake_avatar.png';
import styled from '@emotion/styled';
// https://mui.com/material-ui/react-checkbox/
import { Checkbox } from '@mui/material';
import { connect } from 'react-redux';

const ChatRoomMainWrapper = styled('div')({
  width: '75%',
  display: 'flex',
  marginTop: '10px',
  justifyContent: 'flex-end',
});

const SaveMessageButtonContainer = styled('div')({
  width: '10%',
  display: 'flex',
});

const MessageContentWrapper = styled('div')({
  width: '90%',
  display: 'flex',
});

const MessageRow = styled('div')({
  display: 'flex',
  width: '100%',
});

const MessageRowRight = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

const MessageBlue = styled('div')({
  position: 'relative',
  marginLeft: '20px',
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#A8DDFD',
  width: '60%',
  //height: "50px",
  textAlign: 'left',
  font: "400 .9em 'Open Sans', sans-serif",
  border: '1px solid #97C6E3',
  borderRadius: '10px',
  '&:after': {
    content: "''",
    position: 'absolute',
    width: '0',
    height: '0',
    borderTop: '15px solid #A8DDFD',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    top: '0',
    left: '-15px',
  },
  '&:before': {
    content: "''",
    position: 'absolute',
    width: '0',
    height: '0',
    borderTop: '17px solid #97C6E3',
    borderLeft: '16px solid transparent',
    borderRight: '16px solid transparent',
    top: '-1px',
    left: '-17px',
  },
});

const MessageOrange = styled('div')({
  position: 'relative',
  marginRight: '20px',
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f8e896',
  width: '60%',
  //height: "50px",
  textAlign: 'left',
  font: "400 .9em 'Open Sans', sans-serif",
  border: '1px solid #dfd087',
  borderRadius: '10px',
  '&:after': {
    content: "''",
    position: 'absolute',
    width: '0',
    height: '0',
    borderTop: '15px solid #f8e896',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    top: '0',
    right: '-15px',
  },
  '&:before': {
    content: "''",
    position: 'absolute',
    width: '0',
    height: '0',
    borderTop: '17px solid #dfd087',
    borderLeft: '16px solid transparent',
    borderRight: '16px solid transparent',
    top: '-1px',
    right: '-17px',
  },
});

const MessageContent = styled('div')({ padding: 0, margin: 0 });

const MessageTimeStampRight = styled('div')({
  position: 'absolute',
  fontSize: '.85em',
  fontWeight: '300',
  marginTop: '10px',
  bottom: '-3px',
  right: '5px',
});

const DisplayName = styled('div')({ marginLeft: '20px' });

const MessageLeft = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
  mapKey,
  isSelectMessageBoxDisabled,
}) => {
  console.log('left', isSelectMessageBoxDisabled);
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';
  const photoURL = FakeAvatar;
  const displayName = username ? username : 'no username';
  const [selected, setSelected] = useState(false);

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

      // find object and index

      const removedMessage = messageArrayToBeRemoved.find(
        (message) => message.messageId === mapKey
      );
      const removedIndex = messageArrayToBeRemoved.indexOf(removedMessage);
      console.log('被移除的index', removedIndex);
      // 移除該index
      messageArrayToBeRemoved.splice(removedIndex, 1);
      console.log('更新後的', messageArrayToBeRemoved);
      window.localStorage.setItem(
        'selectedMessagesCollection',
        JSON.stringify(messageArrayToBeRemoved)
      );
    }
  };

  return (
    <ChatRoomMainWrapper>
      <SaveMessageButtonContainer>
        <Checkbox
          checked={selected}
          onChange={handleSelected}
          disabled={isSelectMessageBoxDisabled}
        />
      </SaveMessageButtonContainer>

      <MessageContentWrapper>
        <MessageRow>
          <Avatar alt={displayName} src={photoURL}></Avatar>

          <DisplayName>{displayName}</DisplayName>
          <MessageBlue>
            <MessageContent>{message}</MessageContent>
            <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
          </MessageBlue>
        </MessageRow>
      </MessageContentWrapper>
    </ChatRoomMainWrapper>
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
}) => {
  console.log('right', isSelectMessageBoxDisabled);
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';
  const [selected, setSelected] = useState(false);

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

      // find object and index

      const removedMessage = messageArrayToBeRemoved.find(
        (message) => message.messageId === mapKey
      );
      const removedIndex = messageArrayToBeRemoved.indexOf(removedMessage);
      console.log('被移除的index', removedIndex);
      // 移除該index
      messageArrayToBeRemoved.splice(removedIndex, 1);
      console.log('更新後的', messageArrayToBeRemoved);
      window.localStorage.setItem(
        'selectedMessagesCollection',
        JSON.stringify(messageArrayToBeRemoved)
      );
    }
  };

  return (
    <ChatRoomMainWrapper>
      <SaveMessageButtonContainer>
        <Checkbox
          checked={selected}
          onChange={handleSelected}
          disabled={isSelectMessageBoxDisabled}
        />
      </SaveMessageButtonContainer>
      <MessageContentWrapper>
        <MessageRowRight>
          <MessageOrange>
            <MessageContent>{message}</MessageContent>
            <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
          </MessageOrange>
        </MessageRowRight>
      </MessageContentWrapper>
    </ChatRoomMainWrapper>
  );
};

export const ChatBubble = ({
  content,
  fromMe,
  username,
  date,
  sameTime,
  mapKey,
  isSelectMessageBoxDisabled,
}) => {
  console.log(isSelectMessageBoxDisabled);
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
    />
  );
};

const mapStoreStateToProps = ({ card }) => {
  return {
    ...card,
  };
};

export default connect(mapStoreStateToProps)(ChatBubble);
// connect(mapStoreStateToProps)(MessageLeft);
// connect(mapStoreStateToProps)(MessageRight);
