import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FakeAvatar from '../../../shared/images/fake_avatar.png';

export const SingleSelectedMessages = () => {
  // TODO:
  // 1. 從localStorage取得message TODO: (可以加個簡單error防呆機制 有時間的話)
  // 2. mail之後轉乘username

  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection'
  );
  const messagesArray = JSON.parse(messagesCollectionInString);

  messagesArray.map((singleMessage) => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              key={singleMessage.messageId}
              alt={singleMessage.sender}
              src={FakeAvatar}
            />
          </ListItemAvatar>
          <ListItemText
            key={singleMessage.messageId}
            primary={singleMessage.sender}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {singleMessage.time}
                </Typography>
                {singleMessage.message}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  });
};
