import React from 'react';
import { Button } from '@mui/material';

// buttonName, customStyles, disabled, onClick
const SignInButton = ({ handleLogin, isValidInput }) => {
  return (
    <>
      <Button
        disabled={!isValidInput}
        onClick={handleLogin}
        type="submit"
        fullWidth
        variant="contained"
        handleLogin={handleLogin}
        isValidInput={isValidInput}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </>
  );
};

export default SignInButton;
