import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

export const SelectedMessagesArea = ({ friends, userInfoDetail }) => {
  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection'
  );
  const messagesArray = JSON.parse(messagesCollectionInString);
  const myMail = localStorage.getItem('userMail');

  const setFromPicture = (friendmail) => {
    const target = friends.find((ele) => ele.mail === friendmail);
    if (target !== undefined || null) {
      return target.photo;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail.photo;
    }
  };

  // 從friends find當前用戶的username
  const setCurrentUserName = (friendmail) => {
    const target = friends.find((ele) => ele.mail === friendmail);
    if (target !== undefined || null) {
      return target.username;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail.username;
    }
  };

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {messagesArray?.map((singleMessage) => {
        const localMsgTime = new Date(singleMessage.time);
        const localDate = localMsgTime.toDateString();
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  key={singleMessage.messageId}
                  alt={singleMessage.sender}
                  src={setFromPicture(singleMessage.sender)}
                />
              </ListItemAvatar>
              <ListItemText
                key={singleMessage.messageId}
                primary={setCurrentUserName(singleMessage.sender)}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {localDate}
                    </Typography>
                    <Typography>{singleMessage.message}</Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

const mapStoreStateToProps = ({ card, friends, auth }) => {
  return { ...card, ...friends, ...auth };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(SelectedMessagesArea);
