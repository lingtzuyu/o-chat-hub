import React from 'react';
import MainButton from '../../shared/components/MainButton';
import RedirectPopInfo from '../../shared/components/RedirectPopInfo';
// useHistory can't use in v6
import { useNavigate } from 'react-router-dom';
// tooltip 套件，可以在mouse over的時候有提示
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
