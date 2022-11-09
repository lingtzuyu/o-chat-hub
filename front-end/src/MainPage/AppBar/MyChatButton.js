import React from 'react';
import Button from '@mui/material/Button';
// icons: https://mui.com/material-ui/material-icons/

import TextsmsIcon from '@mui/icons-material/Textsms';

const MyChatButton = () => {
  return (
    <Button
      style={{
        width: '64px',
        height: '64px',
        minwidth: '0',
        borderRadius: '20px',
        margin: '0',
        padding: '0',
        marginTop: '30px',
        color: 'white',
        backgroundColor: 'grey',
      }}
    >
      <TextsmsIcon />
    </Button>
  );
};

export default MyChatButton;
