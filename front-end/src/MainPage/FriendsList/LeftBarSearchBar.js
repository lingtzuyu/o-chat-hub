import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  styled,
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `,
);

export const LeftBarSearchBar = () => {
  return (
    <RootWrapper>
      <TextField
        sx={{
          mt: 2,
          mb: 1,
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        placeholder={'Search contact'}
      />

      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h4"
      >
        {'Contact'}
      </Typography>
    </RootWrapper>
  );
};
