import React from 'react';

import Button from '@mui/material/Button';

const MainButton = ({ buttonName, customStyles, disable, onClick }) => {
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
        height: '40px',
      }}
      // 如果想要輸入客製style來製造這個butoon
      style={customStyles ? customStyles : {}}
      disable={disable}
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};

export default MainButton;
