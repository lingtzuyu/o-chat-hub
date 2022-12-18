import React from 'react';

import { Button } from '@mui/material';

// buttonName, customStyles, disabled, onClick
const SignupButton = ({ handleSignup, isValidInput }) => {
  return (
    <>
      <Button
        disabled={!isValidInput}
        onClick={handleSignup}
        type="submit"
        fullWidth
        variant="contained"
        handleSignup={handleSignup}
        isValidInput={isValidInput}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignupButton;
