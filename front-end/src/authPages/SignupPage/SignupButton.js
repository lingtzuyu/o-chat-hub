import React from 'react';
import MainButton from '../../shared/components/MainButton';
import RedirectPopInfo from '../../shared/components/RedirectPopInfo';
// useHistory can't use in v6
import { useNavigate } from 'react-router-dom';
// tooltip 套件，可以在mouse over的時候有提示
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
