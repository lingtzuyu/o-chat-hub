import React from 'react';
import Box from '@mui/material/Box';

const OnlineIcon = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        // 以parent來從右邊算
        right: '6px',
        color: 'green',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      online
    </Box>
  );
};

export default OnlineIcon;
