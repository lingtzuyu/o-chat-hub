import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Card,
  styled,
  Divider,
  Checkbox,
} from '@mui/material';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes,
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import FakeProfilePic from '../../shared/images/avatar.jpg';
import TempProfilePic from '../../shared/images/ProfilePhoto.jpg';
import { connect } from 'react-redux';

// 日期分隔線
const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

// 自己發出去的訊息
const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

// 別人回送的訊息
const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

// 1. iterate下來，If 日期 == ，則繼續依照sender左右
// 2. else (日期 !=)，則先加分隔線

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
  const photoURL = FakeProfilePic;
  const displayName = username ? username : 'no username';

  // console.log('來自於我sameTime', sameTime);
  // console.log('來自於我date', date);
  // console.log('來自於我fromMe', fromMe);
  // checkbox是否被select到
  const [selected, setSelected] = useState(false);

  // select以及unselect的行為
  // TODO: 這邊的select也該用redux store控制來清掉
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
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-end"
      py={3}
    >
      <Checkbox
        // 用message save是否按下來控制visibility

        sx={{ marginRight: '20px', visibility: isSelectedMessageBoxShown }}
        checked={selected}
        onChange={handleSelected}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-end"
        mr={2}
      >
        <CardWrapperPrimary>{message}</CardWrapperPrimary>
        <Typography
          variant="subtitle1"
          sx={{
            pt: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ScheduleTwoToneIcon
            sx={{
              mr: 0.5,
            }}
            fontSize="small"
          />
          {/* TODO: 研究怎麼顯示 */}
          {/* {formatDistance(subHours(new Date(), 115), new Date(), {
          addSuffix: true,
        })} */}
          {timestamp}
        </Typography>
      </Box>
      <Avatar
        variant="rounded"
        sx={{
          width: 50,
          height: 50,
        }}
        alt={displayName}
        src={TempProfilePic}
      />
    </Box>
  );
};

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
  const photoURL = FakeProfilePic;
  const displayName = username ? username : 'no username';

  // checkbox是否被select到
  const [selected, setSelected] = useState(false);

  // select以及unselect的行為
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
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={3}
    >
      <Checkbox
        // 用message save是否按下來控制visibility

        sx={{ marginRight: '20px', visibility: isSelectedMessageBoxShown }}
        checked={selected}
        onChange={handleSelected}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
      <Avatar
        variant="rounded"
        sx={{
          width: 50,
          height: 50,
        }}
        alt={displayName}
        src={photoURL}
      />
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
        ml={2}
      >
        <CardWrapperSecondary>{message}</CardWrapperSecondary>
        <Typography
          variant="subtitle1"
          sx={{
            pt: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ScheduleTwoToneIcon
            sx={{
              mr: 0.5,
            }}
            fontSize="small"
          />
          {/* TODO: 研究怎麼顯示 */}
          {/* {formatDistance(subHours(new Date(), 115), new Date(), {
            addSuffix: true,
          })} */}
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

const DividerLine = ({ date }) => {
  return (
    <DividerWrapper>
      {/* TODO: 分隔線邏輯資料需要重新定 */}
      {date}
    </DividerWrapper>
  );
};

const SingleChatBubble = ({
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

const mapStoreStateToProps = ({ chat, card }) => {
  return { ...chat, ...card };
};

export default connect(mapStoreStateToProps)(SingleChatBubble);