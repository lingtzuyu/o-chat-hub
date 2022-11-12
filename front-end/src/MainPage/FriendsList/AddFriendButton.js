import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddFriendPopout from './AddFriendPopout';

const AddFriendButton = () => {
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
      <Button
        style={{
          marginTop: '30px',
          marginLeft: '6px',
          width: '80%',
          height: '64px',
          background: 'grey',
          backgroundColor: 'grey',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600',
        }}
        onClick={handleOpenPopout}
      >
        Add Friends
      </Button>
      <AddFriendPopout
        isPopoutOpen={isPopoutOpen}
        closePopout={handleClosePopout}
      />
    </>
  );
};

export default AddFriendButton;
