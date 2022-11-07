import React from 'react';

import Button from '@mui/material/Button';

const MainButton = ({ buttonName, customStyles, disabled, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: 'white',
        color: 'black',
        textTransform: 'none',
        fortSize: '12px',
        fontWeight: '600',
        width: '100%',
        height: '50px',
      }}
      // 如果想要輸入額外客製style來製造這個butoon，如果沒有就用default的style
      style={customStyles ? customStyles : {}}
      // 根據進來的disabled狀態來決定要不要disabled
      disabled={disabled}
      // 同上
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};

export default MainButton;
