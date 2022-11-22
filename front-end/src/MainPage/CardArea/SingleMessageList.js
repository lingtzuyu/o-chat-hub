import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FakeAvatar from '../../shared/images/fake_avatar.png';

export const SingleMessageList = ({ sender, content, date, id }) => {
  const myMail = localStorage.getItem('userMail');
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar key={id} alt={sender} src={FakeAvatar} />
        </ListItemAvatar>
        <ListItemText
          key={id}
          primary={sender === myMail ? sender : 'FROM ME'}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {date}
              </Typography>
              <Typography>{content}</Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};
