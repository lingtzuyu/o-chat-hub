import React from 'react';
import { styled } from '@mui/system';
// 缺少avatar
import { Typography } from '@mui/material';

const MessageAreaHeaderWrapper = styled('div')({
  width: '90%',
  display: 'column',
  marginTop: '10px',
});

export const MessageAreaHeader = ({ name = '' }) => {
  return (
    <MessageAreaHeaderWrapper>
      <Typography
        variant="h5"
        sx={{ color: 'black', marginLeft: '6px', marginRight: '6px' }}
      >
        {name}
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: 'grey', marginLeft: '6px', marginRight: '6px' }}
      >
        Start your conversation
      </Typography>
    </MessageAreaHeaderWrapper>
  );
};
