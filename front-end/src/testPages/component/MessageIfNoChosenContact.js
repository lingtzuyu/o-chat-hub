import React from 'react';
import { styled, Box } from '@mui/system';
import { Typography } from '@mui/material';
import GuideStep from '../../authPages/Components/GuideStep';

const ChatContentMessageWrapper = styled('div')({
  flexGrow: 1,
  padding: '20px',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
});

// 什麼都沒選到的時候，顯示此段文字

export const MeesageIfNoChosenContact = () => {
  return (
    <ChatContentMessageWrapper>
      <Box marginLeft="5%">
        <Typography variant="h3" sx={{ color: 'grey' }}>
          Choose a contact to start conversation
        </Typography>
      </Box>
      <Box marginLeft="5%">
        <GuideStep />
      </Box>
    </ChatContentMessageWrapper>
  );
};
