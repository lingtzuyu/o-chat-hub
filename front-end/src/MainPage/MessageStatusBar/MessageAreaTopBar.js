import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import SelectedChat from './SelectedChat';
import styled from '@emotion/styled';

const MessageAreaTopBarContainer = styled('div')({
  width: '96%',
  height: '12%',
  display: 'flex',
  backgroundColor: '#DFF6FF',
  justifyContent: 'space-around',
  alignItems: 'center',
});

export default function MessageAreaTopBar() {
  return (
    <MessageAreaTopBarContainer>
      <SelectedChat />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>Save Message</Button>
          <Button>Set Alert</Button>
          <Button>Set Schedule</Button>
        </ButtonGroup>
      </Box>
    </MessageAreaTopBarContainer>
  );
}
