import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserIconMenu from './UserIconMenu';
import styled from '@emotion/styled';

const TopBarContainer = styled('div')({
  width: '100%',
  height: '10%',
  display: 'flex',
  backgroundColor: 'grey',
});

// https://mui.com/material-ui/react-app-bar/
const TopAppBar = () => {
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     // position: 'absolute',
    //     height: '100px',
    //     // backgroundColor: 'black',
    //     width: '100%',
    //     // 左右開
    //     // justifyContent: 'space-between',
    //   }}
    // >
    <TopBarContainer>
      <AppBar position="static" sx={{ bgcolor: '#06283D' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#DFF6FF' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#DFF6FF' }}
          >
            Chat-Notes
          </Typography>
          <Button color="inherit" sx={{ color: '#DFF6FF' }}>
            Messages
          </Button>
          <Button color="inherit" sx={{ color: '#DFF6FF' }}>
            Cards
          </Button>
          <Button color="inherit" sx={{ color: '#DFF6FF' }}>
            Settings
          </Button>
          <UserIconMenu />
        </Toolbar>
      </AppBar>
    </TopBarContainer>
    // </Box>
  );
};

export default TopAppBar;
