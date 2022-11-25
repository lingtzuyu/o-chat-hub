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

export const SelectedMessagesArea = () => {
  const messagesCollectionInString = localStorage.getItem(
    'selectedMessagesCollection'
  );
  const messagesArray = JSON.parse(messagesCollectionInString);
  const myMail = localStorage.getItem('userMail');

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {messagesArray?.map((singleMessage) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  key={singleMessage.messageId}
                  alt={singleMessage.sender}
                  src={''}
                />
              </ListItemAvatar>
              <ListItemText
                key={singleMessage.messageId}
                primary={
                  singleMessage.sender === myMail
                    ? singleMessage.sender
                    : 'FROM ME'
                }
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

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(SelectedMessagesArea);
