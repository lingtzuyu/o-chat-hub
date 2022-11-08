import React from 'react';
import { Typography } from '@mui/material';

const LoginPageHeader = () => {
  return (
    <>
      {/* typography用來處理文字 ，注意看variant就可以用來賦予它是h1 h2...etc.*/}
      <Typography variant="h5" sx={{ color: 'white' }}>
        Ready for messaging?
      </Typography>
      <Typography variant="subtitle2" sx={{ color: 'white' }}>
        Log in for more productivity!
      </Typography>
    </>
  );
};

// 接下來你就可以把這段文字wrap在其他的component中 (想像成div)

export default LoginPageHeader;
