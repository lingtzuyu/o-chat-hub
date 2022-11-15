import React from 'react';
import { Typography } from '@mui/material';

// 製造一個可以塞name進來的字串元件
const FriendsListLabel = ({ label }) => {
  return (
    <Typography
      sx={{
        textTransform: 'uppercase',
        fontWeight: 800,
        fontSize: '36px',
        marginLeft: '36px',
        marginTop: '20px',
        color: '#1363DF',
      }}
    >
      {label}
    </Typography>
  );
};

export default FriendsListLabel;
