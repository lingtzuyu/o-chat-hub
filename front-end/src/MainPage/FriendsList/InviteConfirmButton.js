import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
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
        <CheckIcon />
      </IconButton>
      <IconButton
        style={{ color: 'grey' }}
        disabled={disabled}
        onClick={handleRejectInivte}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default InviteConfirmButton;
