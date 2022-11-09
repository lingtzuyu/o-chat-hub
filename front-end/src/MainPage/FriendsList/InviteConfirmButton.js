import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
//TODO: change to mui icons later
// import CheckIcon from '@mui/icons-material/Check';
// import ClearIcon from '@mui/icons-material/Clear';

// 這三個的state以及控制在InviteDataItems.js
const InviteConfirmButton = ({
  disabled,
  handleAcceptInivte,
  handleRejectInivte,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        style={{ color: 'grey' }}
        disabled={disabled}
        onClick={handleAcceptInivte}
      >
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '20px',
            backgroundColor: 'grey',
            color: 'white',
          }}
        >
          Confirm
        </Button>
      </IconButton>
      <IconButton
        style={{ color: 'grey' }}
        disabled={disabled}
        onClick={handleAcceptInivte}
      >
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '20px',
            backgroundColor: 'grey',
            color: 'white',
          }}
        >
          Reject
        </Button>
      </IconButton>
    </Box>
  );
};

export default InviteConfirmButton;
