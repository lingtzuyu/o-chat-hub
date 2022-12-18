import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `,
);

export const LeftBarPendingListTitle = () => {
  return (
    <RootWrapper>
      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h4"
      >
        {'Invitation'}
      </Typography>
    </RootWrapper>
  );
};
