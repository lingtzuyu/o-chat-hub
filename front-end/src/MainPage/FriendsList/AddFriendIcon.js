import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddFriendPopout from './AddFriendPopout';

export const AddFriendIcon = () => {
  // popout是否要關閉要透過state來傳遞
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  // 這個要寫在裡面，等等會一起被打包走
  const handleOpenPopout = () => {
    // 如果isPopoutOpen的話，傳遞true的state
    setIsPopoutOpen(true);
  };

  // 變動是否開啟popout的狀態為false，以便下次開啟
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
