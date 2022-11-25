import React from 'react';
import { Typography } from '@mui/material';

const FriendsListLabel = ({ label }) => {
  return (
    <Typography
      sx={{
        alignItems: 'center',
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
