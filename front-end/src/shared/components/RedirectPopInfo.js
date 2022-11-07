import { Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

const RedirectInfo = styled('span')({
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
});

const RedirectPopInfo = ({
  content,
  redirectInfo,
  customStyles,
  handleRedirect,
}) => {
  return (
    <Typography
      sx={{ color: 'white' }}
      style={customStyles ? customStyles : {}}
      variant="h6"
    >
      {content}
      <RedirectInfo onClick={handleRedirect}>{redirectInfo}</RedirectInfo>
    </Typography>
  );
};

export default RedirectPopInfo;
