import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { GiConfirmed } from 'react-icons/gi';
import { GiCancel } from 'react-icons/gi';
//TODO: change to mui icons later
// import CheckIcon from '@mui/icons-material/Check';
// import ClearIcon from '@mui/icons-material/Clear';

// for change icon style
const iconStyle = { color: 'yellow', fontSize: '1.5em' };

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
        <GiConfirmed />
      </IconButton>
      <IconButton
        style={{ color: 'grey' }}
        disabled={disabled}
        onClick={handleRejectInivte}
      >
        <GiCancel />
      </IconButton>
    </Box>
  );
};

export default InviteConfirmButton;
