import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// https://mui.com/material-ui/react-container/
const SimpleContainer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            height: '100vh',
            borderRight: '0.5px grey',
          }}
        />
      </Container>
    </React.Fragment>
  );
};
