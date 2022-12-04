import React, { useState } from 'react';
import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
} from '@mui/material';

import TempProfilePic from '../shared/images/ProfilePhoto.jpg';

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';

import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

import { sendDirectMessge } from '../chat/socketConnectionClient';

import { connect } from 'react-redux';

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

const Input = styled('input')({
  display: 'none',
});

function BottomBarContent({ chosenChatDetails, userInfoDetail }) {
  // TODO: 要改透過redux拿到
  const userMail = localStorage.getItem('userMail');
  const [messageToBeSent, setMessageToBeSent] = useState('');
  const theme = useTheme();

  const isSendButtonDisabled = chosenChatDetails ? false : true;
  const tipMessage = chosenChatDetails
    ? 'Send your message here...'
    : 'Please choose a contact before input...';

  // 監聽onChange的event
  const handleInputAreaChange = (event) => {
    setMessageToBeSent(event.target.value);
  };

  const sendMessages = () => {
    // TODO: 在socketConnection中設立發訊息事件
    // 防止空的messgage
    if (messageToBeSent.length > 0) {
      console.log(chosenChatDetails);
      sendDirectMessge({
        // 選擇好友的時候會存入的
        receiverId: chosenChatDetails.id,
        content: messageToBeSent,
      });
    }
    // setMessage空直要放在送出資料後面，不然會直接先清空
    setMessageToBeSent('');
  };

  // 按下按鍵後就執行send Message
  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendMessages();
    }
  };

  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: 'flex',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box flexGrow={1} display="flex" alignItems="center">
        <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={userMail}
          // TODO: change later for real image
          src={userInfoDetail?.photo}
        />
        <MessageInputWrapper
          disabled={isSendButtonDisabled}
          autoFocus
          placeholder={tipMessage}
          fullWidth
          value={messageToBeSent}
          onChange={handleInputAreaChange}
          onKeyDown={handleKeyPressed}
        />
      </Box>
      <Box>
        {/* TODO: 之後用套件做出來 */}
        <Tooltip arrow placement="top" title={'Choose an emoji'}>
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip>
        {/* <Input accept="image/*" id="messenger-upload-file" type="file" />
        <Tooltip arrow placement="top" title={t('Attach a file')}>
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1 }} color="primary" component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip> */}
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={sendMessages}
          disabled={isSendButtonDisabled}
        >
          {'Send'}
        </Button>
      </Box>
    </Box>
  );
}

const mapStoreStateToProps = ({ chat, auth }) => {
  return { ...chat, ...auth };
};

export default connect(mapStoreStateToProps)(BottomBarContent);
