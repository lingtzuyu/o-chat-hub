import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

// wrap the box for containing loggin area
// use styled to give it style like css

const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#594545',
});

// return上面這個我們建立出來的boxwrapper

//  the sx prop allows you to specify any other CSS rules you may need

const loginArea = (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: 700,
          height: 400,
          bgcolor: '#815B5B',
          borderRadius: '5px',
          boxShadow: '0 3px 10px 0 rgb(0 0 0 / 30%)',
          display: 'flex',
          flexDirection: 'column',
          padding: '25px',
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default loginArea;
