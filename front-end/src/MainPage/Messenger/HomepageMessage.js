import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const HomePageWrapper = styled('div')({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const HomepageMessage = () => {
  return (
    <HomePageWrapper>
      <Typography variant="h3" sx={{ color: 'grey' }}>
        Choose your friend to start conversation
      </Typography>
    </HomePageWrapper>
  );
};

export { HomepageMessage };
