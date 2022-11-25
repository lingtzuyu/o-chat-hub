import React from 'react';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const OfflineIndicator = () => {
  return (
    <Box
      sx={{
        color: '#223354',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '6px',
      }}
    >
      <FiberManualRecordIcon />
    </Box>
  );
};

export default OfflineIndicator;
