import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddFriendPopout from './AddFriendPopout';

// add friend Button with the control of pop out dialog
export const AddFriendIcon = () => {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const handleOpenPopout = () => {
    setIsPopoutOpen(true);
  };

  const handleClosePopout = () => {
    setIsPopoutOpen(false);
  };
  return (
    <>
      <IconButton
        style={{
          color: '#47B5FF',
        }}
        onClick={handleOpenPopout}
      >
        <PersonAddAlt1Icon />
      </IconButton>
      <AddFriendPopout
        isPopoutOpen={isPopoutOpen}
        closePopout={handleClosePopout}
      />
    </>
  );
};
