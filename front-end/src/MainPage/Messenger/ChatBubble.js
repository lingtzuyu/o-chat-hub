import React from 'react';
import { Avatar } from '@mui/material';
import FakeAvatar from '../../shared/images/fake_avatar.png';
import styled from '@emotion/styled';

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

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     messageRow: {
//       display: 'flex',
//     },
//     messageRowRight: {
//       display: 'flex',
//       justifyContent: 'flex-end',
//     },
//     messageBlue: {
//       position: 'relative',
//       marginLeft: '20px',
//       marginBottom: '10px',
//       padding: '10px',
//       backgroundColor: '#A8DDFD',
//       width: '60%',
//       //height: "50px",
//       textAlign: 'left',
//       font: "400 .9em 'Open Sans', sans-serif",
//       border: '1px solid #97C6E3',
//       borderRadius: '10px',
//       '&:after': {
//         content: "''",
//         position: 'absolute',
//         width: '0',
//         height: '0',
//         borderTop: '15px solid #A8DDFD',
//         borderLeft: '15px solid transparent',
//         borderRight: '15px solid transparent',
//         top: '0',
//         left: '-15px',
//       },
//       '&:before': {
//         content: "''",
//         position: 'absolute',
//         width: '0',
//         height: '0',
//         borderTop: '17px solid #97C6E3',
//         borderLeft: '16px solid transparent',
//         borderRight: '16px solid transparent',
//         top: '-1px',
//         left: '-17px',
//       },
//     },
//     messageOrange: {
//       position: 'relative',
//       marginRight: '20px',
//       marginBottom: '10px',
//       padding: '10px',
//       backgroundColor: '#f8e896',
//       width: '60%',
//       //height: "50px",
//       textAlign: 'left',
//       font: "400 .9em 'Open Sans', sans-serif",
//       border: '1px solid #dfd087',
//       borderRadius: '10px',
//       '&:after': {
//         content: "''",
//         position: 'absolute',
//         width: '0',
//         height: '0',
//         borderTop: '15px solid #f8e896',
//         borderLeft: '15px solid transparent',
//         borderRight: '15px solid transparent',
//         top: '0',
//         right: '-15px',
//       },
//       '&:before': {
//         content: "''",
//         position: 'absolute',
//         width: '0',
//         height: '0',
//         borderTop: '17px solid #dfd087',
//         borderLeft: '16px solid transparent',
//         borderRight: '16px solid transparent',
//         top: '-1px',
//         right: '-17px',
//       },
//     },

//     messageContent: {
//       padding: 0,
//       margin: 0,
//     },
//     messageTimeStampRight: {
//       position: 'absolute',
//       fontSize: '.85em',
//       fontWeight: '300',
//       marginTop: '10px',
//       bottom: '-3px',
//       right: '5px',
//     },

//     orange: {
//       color: theme.palette.getContrastText(deepOrange[500]),
//       backgroundColor: deepOrange[500],
//       width: theme.spacing(4),
//       height: theme.spacing(4),
//     },
//     avatarNothing: {
//       color: 'transparent',
//       backgroundColor: 'transparent',
//       width: theme.spacing(4),
//       height: theme.spacing(4),
//     },
//     displayName: {
//       marginLeft: '20px',
//     },
//   })
// );

const MessageLeft = ({ content, fromMe, username, date, sameTime }) => {
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';
  const photoURL = FakeAvatar;
  const displayName = username ? username : 'no username';
  // const classes = useStyles();
  return (
    <>
      <MessageRow>
        <Avatar
          alt={displayName}
          // className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <DisplayName>{displayName}</DisplayName>
          <MessageBlue>
            <MessageContent>{message}</MessageContent>
            <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
          </MessageBlue>
        </div>
      </MessageRow>
    </>
  );
};

const MessageRight = ({ content, fromMe, username, date, sameTime }) => {
  console.log('右邊', content);
  // const classes = useStyles();
  const message = content ? content : 'no message';
  const timestamp = date ? date : '';
  return (
    <MessageRowRight>
      <MessageOrange>
        <MessageContent>{message}</MessageContent>
        <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
      </MessageOrange>
    </MessageRowRight>
  );
};

export const ChatBubble = ({ content, fromMe, username, date, sameTime }) => {
  if (fromMe && sameTime) {
    console.log('判斷式泡泡內的', content);
    return (
      <MessageRight
        content={content}
        username={username}
        fromMe={fromMe}
        date={date}
        sameTime={sameTime}
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
    />
  );
};
