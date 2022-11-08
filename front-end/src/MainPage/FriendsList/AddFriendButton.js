import React from 'react';
import Button from '@mui/material/Button';

const AddFriendButton = () => {
  // 這個要寫在裡面，等等會一起被打包走
  const openPopoutForaddingFriends = () => {};

  return (
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
      onClick={openPopoutForaddingFriends}
    >
      Add Friends
    </Button>
  );
};

export default AddFriendButton;
