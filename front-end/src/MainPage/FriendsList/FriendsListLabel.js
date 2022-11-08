import React from 'react';
import { Typography } from '@mui/material';

// 製造一個可以塞name進來的字串元件
const FriendsListLabel = ({ label }) => {
  return (
    <Typography
      sx={{
        textTransform: 'uppercase',
        color: 'black',
        fontSize: '20px',
        marginTop: '20px',
      }}
    >
      {label}
    </Typography>
  );
};

export default FriendsListLabel;
